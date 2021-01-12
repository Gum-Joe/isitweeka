

# Relative to ../
SAVE_LOCATION=./frontend/public/cal/$SCHOOL/basic.ics

echo Fetching latest iCal...
echo From $CALENDAR_URL
echo To $SAVE_LOCATION

curl -o $SAVE_LOCATION $CALENDAR_URL