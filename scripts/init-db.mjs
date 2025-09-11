import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./data/dbs/uploads.db");

db.run(`
  CREATE TABLE IF NOT EXISTS uploads (
    id TEXT UNIQUE, dest TEXT, original_name TEXT, size_bytes INTEGER, mime_type TEXT
  )
`);
