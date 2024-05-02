#!/bin/bash
# entrypoint.sh

# Exit on any error
set -e

# Start the Rails server directly
echo "Starting Rails server..."
exec bundle exec rails s -p 3000 -b '0.0.0.0'
