#!/usr/bin/env bash

while 'true'
do
    if [ "$(curl -s http://localhost:8080/health)" = 'Hello from EC1' ]
    then
        echo "server is running!"
        exit 0
    else
        echo "check server is running?"
        sleep 3s
    fi
done
