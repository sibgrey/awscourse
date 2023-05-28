#!/usr/bin/env bash
if [ "$DEPLOYMENT_GROUP_NAME" == "dev" ]
then
  # upload Cloudwatch configuration, that was uploaded to S3
  echo "Uploading Cloudwatch configuration..."
  sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -s -c file:/tmp/amazon-cloudwatch-agent.json
  # run process in the background, redirect stdin, stdout, stderr to nowhere (/dev/null). nohup redirects input and output to specific file nohup.out
  echo "Trying to run application..."
  nohup java -jar -Dspring.profiles.active=dev /tmp/billing-service.jar > /dev/null 2> /dev/null < /dev/null &
else
  echo "No running applications was found for the deployment group name!"
fi
exit 0
