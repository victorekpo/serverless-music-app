#!/bin/bash

#npm run synth

### sam.cmd for windows regular sam for linux/mac
#sam.cmd build \
#  -t ../../cdk.out/MusicApp-API.template.json
#
#sam.cmd build \
#  -t ../../cdk.out/MusicApp-Fns.template.json


sam.cmd local start-api
