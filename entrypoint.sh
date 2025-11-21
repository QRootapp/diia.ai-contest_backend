#!/bin/sh

echo "Waiting for MySQL to be ready..."

until node -e "const mysql = require('mysql2/promise'); mysql.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASS}).then(c => c.end()).catch(() => process.exit(1))"; do
  sleep 1
done

echo "MySQL is up. Running migrations..."

npm run migrate:latest

echo "Starting application..."
npm run start
