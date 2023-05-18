#!/usr/bin/env bash
# run process in the background, redirect stdout, stderr, and stdin to /dev/null
java -jar /tmp/billing-service.jar > /dev/null 2> /dev/null < /dev/null  &