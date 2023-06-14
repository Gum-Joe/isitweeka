
# $2 is the school
# $1 is the url
# KECHB:
#   $2 = KECHB
#   $1 = https://calendar.google.com/calendar/ical/calendar%40camphillboys.bham.sch.uk/public/basic.ics
#
# KECHG:
#   $2 = KECHG
#   $1 = https://calendar.google.com/calendar/ical/calendar%40kechg.org.uk/public/basic.ics

# Relative to ../
SAVE_LOCATION=./frontend/public/cal/$2/basic.ics
INDEX_LOCATION=./frontend/public/cal/$2/calendar.json

echo Fetching latest iCal...
echo From $1
echo To $SAVE_LOCATION

curl -o $SAVE_LOCATION $1

echo Builing index...
echo From $SAVE_LOCATION
echo To $INDEX_LOCATION

./indexer/target/release/indexer $SAVE_LOCATION $INDEX_LOCATION
