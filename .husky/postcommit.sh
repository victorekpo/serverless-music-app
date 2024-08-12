#!/bin/sh
FILE="./client/wrangler.toml"
if [ -f "$FILE" ]; then
  mv ~/tmp.wrangler.toml $FILE
else
  echo "$FILE does not exist."
fi

