#!/bin/bash
set -e

# Check if the database exists
if [ -z "$(mongo --host 34.145.239.124 --username dbadmin --password Yellowstone2019 --authenticationDatabase admin --eval 'db.getMongo().getDBNames().indexOf("gcp_cloud_api_production")' --quiet)" ]; then
  echo "Database does not exist. Creating..."
  rails db:create
  rails db:seed
else
  echo "Database exists."
fi

# Then exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"
