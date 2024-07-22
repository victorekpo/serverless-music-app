#!/bin/bash

npm run synth

# sam.cmd for windows regular sam for linux/mac
sam.cmd local invoke graphqlHandler89480F20 \
  -t ../../../cdk.out/MusicApp-Fns.template.json \
  --env-vars ./env.json \
  --event ./event.json
