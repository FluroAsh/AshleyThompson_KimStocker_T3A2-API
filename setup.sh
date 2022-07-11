#!/bin/bash
which psql > /dev/null 2>&1
EXITCODE=$?

if [[ $EXITCODE -eq 0 ]]; then
  echo "---------------------------------"
  echo ">> Creating Postgres Admin user..."
  echo "In order for the API to be configured correctly use default password 'password'"
  echo "when creating a new Postgres user; or change the config credentials in ./config/config.json"
  echo "---------------------------------"
  # Create the Postgres super user for DB config
  sudo -u postgres createuser -s admin -P
  exit
else
  echo "--- Postgres not installed ---"
  echo $'You need to install PostgreSQL to continue'
  echo "Visit: https://www.postgresql.org/download/"
  exit
fi
