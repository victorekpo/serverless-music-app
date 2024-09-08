#!/bin/sh
FILE="./client/wrangler.toml"
if [ -f "$FILE" ]; then
  cp $FILE ~/tmp.wrangler.toml
  sed -i -e 's/account_id = ".*"/account_id = "**********"/' $FILE
  sed -i -e 's/pattern = ".*"/pattern = "**********"/' $FILE
  sed -i -e 's/API_URL = ".*"/API_URL = "**********"/' $FILE
  sed -i -e 's/API_KEY = ".*"/API_KEY = "**********"/' $FILE
  echo "$FILE updated"
  git add -A
else
  echo "$FILE does not exist."
fi

