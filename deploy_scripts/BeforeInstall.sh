#!/bin/bash
pushd .
sudo rm -rf /home/ec2-user/apps/news/*
#need the pushd and popd because codedeploy with cd
#will break the wholeagent
popd
