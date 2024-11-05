#!/bin/bash

# Define the path to the JAR file
JAR_FILE="/tmp/order-service.jar"

# Check if the JAR file exists or not
if [ ! -f "$JAR_FILE" ]; then
    echo "Error: JAR file does not exist at specified location: $JAR_FILE"
    exit 1
fi

# Start the Java application
echo "Starting the application..."
nohup java -jar "$JAR_FILE" > /home/ec2-user/myapp.log 2>&1 &

# Get the process ID of the last command executed
PID=$!

# Print the PID of the running application
echo "Application started with PID: $PID"

# Exit the script
exit 0