const { Pool } = require("pg");

const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  }
});

db.connect()
.then(() => console.log("Connected to PostgreSQL"))
.catch(err => console.error("Connection error", err));

module.exports = db;