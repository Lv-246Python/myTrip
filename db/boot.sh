#!/bin/bash

# wait for Postgres to start
function postgres_ready(){
python << END
import os
import sys
import psycopg2
try:
    conn = psycopg2.connect(dbname="postgres", user="postgres", password="postgres", host="postgres")
except psycopg2.OperationalError:
    sys.exit(-1)
sys.exit(0)
END
}

until postgres_ready; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done
echo "All is done!"
python ./myTrip/manage.py migrate

python ./myTrip/manage.py runserver 0.0.0.0:8000
