

# Relative to ../
SAVE_LOCATION=./frontend/public/cal/$2/basic.ics

echo Fetching latest iCal...
echo From $1
echo To $SAVE_LOCATION

curl -o $SAVE_LOCATION $1
