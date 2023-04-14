#!/usr/bin/env bash
java -jar /tmp/FirstEC2.jar > /dev/null 2> /dev/null < /dev/null  &
# run process in the background, redirect stdout, stderr, and stdin to /dev/null.