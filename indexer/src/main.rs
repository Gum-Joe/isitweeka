use std::env;
use std::error::Error;
use std::fs::File;
use std::io::BufReader;
use std::{collections::HashMap, fs};

use chrono::{Datelike, Duration, NaiveDate, Weekday};
use ical::parser::ical::component::IcalEvent;
use rrule::RRuleSet;

#[derive(Debug)]
enum WeekEvent {
    Single {
        week: String,
        start: String,
    },
    Recurring {
        week: String,
        start: String,
        rrule: String,
    },
}

fn get_name(event: &IcalEvent) -> String {
    for property in &event.properties {
        if &property.name == "SUMMARY" {
            return property.value.clone().unwrap();
        }
    }
    return String::new();
}

fn into_map(event: &IcalEvent) -> HashMap<String, String> {
    let mut result = HashMap::new();
    for property in &event.properties {
        let name = property.name.clone();
        let value = property.value.clone().unwrap();
        result.insert(name, value);
    }
    result
}

fn parse_event(event: &IcalEvent) -> WeekEvent {
    let properties = into_map(&event);
    let week = properties.get("SUMMARY").unwrap().clone();
    let start = properties.get("DTSTART").unwrap().clone();
    if let Some(rrule) = properties.get("RRULE") {
        let rrule = rrule.clone();
        WeekEvent::Recurring { week, start, rrule }
    } else {
        WeekEvent::Single { week, start }
    }
}

fn finalize_date(date: String) -> String {
    let day = NaiveDate::parse_from_str(&date, "%Y%m%d").unwrap();
    // If weekday is sunday, we are in the girl's school calendar
    if day.weekday() == Weekday::Sun {
        let day_after = day + Duration::days(1);
        let formatted_date = day_after.format("%Y%m%d").to_string();
        formatted_date
    } else {
        date
    }
}

fn title_case(text: String) -> String {
    text.split(" ").last().unwrap().to_uppercase()
}

fn main() -> Result<(), Box<dyn Error>> {
    let mut args = env::args();
    args.next();

    let source = args.next().unwrap();
    let dest = args.next().unwrap();

    // Load calendar from file
    let buf = BufReader::new(File::open(source)?);
    let mut reader = ical::IcalParser::new(buf);
    let calendar = reader.next().unwrap()?;
    println!("PARSED CALENDAR");

    // Find all Week A / B events
    let events = calendar
        .events
        .iter()
        .filter(|x| {
            &get_name(x).to_lowercase() == "week a" || &get_name(x).to_lowercase() == "week b"
        })
        .collect::<Vec<_>>();
    println!("FOUND WEEK A / B EVENTS");

    // Map all Week A / B events into enum
    let events = events.iter().map(|x| parse_event(x)).collect::<Vec<_>>();
    println!("PARSED EVENTS");

    // Populates result with all week data
    let mut result = HashMap::new();
    for event in events {
        match event {
            WeekEvent::Single { week, start, .. } => {
                result.insert(finalize_date(start), title_case(week));
            }
            WeekEvent::Recurring {
                week, start, rrule, ..
            } => {
                let rule_set: RRuleSet = format!("DTSTART:{}\nRRULE:{}", start, rrule)
                    .parse()
                    .unwrap();
                let (instances, _) = rule_set.all(10000);
                for instance in instances {
                    let date = instance.date_naive().format("%Y%m%d").to_string();
                    // RRules may not end soon enough, so do not insert if there is
                    // already a week event
                    if !result.contains_key(&date) {
                        result.insert(finalize_date(date), title_case(week.clone()));
                    }
                }
            }
        }
    }
    println!("GENERATED WEEK DATA");

    // Write results to index
    let as_json = serde_json::to_string(&result).unwrap();
    fs::write(dest, as_json)?;
    println!("WRITTEN WEEK INDEX");

    Ok(())
}
