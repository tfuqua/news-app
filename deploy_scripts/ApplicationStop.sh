#!/bin/bash
pushd .
cd /home/ec2-user/apps/news
#need the pushd and popd because codedeploy with cd
#will break the wholeagent
forever stop server.js
popd
