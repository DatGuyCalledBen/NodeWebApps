#!/bin/bash

# Set the URL of your server
SERVER_URL="http://thatguycalledben.com/NodeAppThree"

# Send an HTTP GET request to the server
response=$(curl -s -o /dev/null -w "%{http_code}" "$SERVER_URL")

# Check the HTTP response code
if [ $response -eq 200 ]; then
  echo "Server is up and running at $SERVER_URL"
else
  echo "Server is not running or could not be reached"
fi

