import fs from "fs";
import path from "path";

import sqlite3 from "sqlite3";

console.log("Initializing data directory...");

const baseDataPath = "./data";
const dataPaths = ["uploads", "dbs", "assets"];

if (!fs.existsSync(baseDataPath)) {
  fs.mkdirSync(baseDataPath);
}

dataPaths.forEach((p) => {
  const fullPath = path.join(baseDataPath, p);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath);
  }
});

console.log("Initializing database...");

const db = new sqlite3.Database("./data/dbs/uploads.db");

db.run(`
  CREATE TABLE IF NOT EXISTS uploads (
    id TEXT UNIQUE, dest TEXT, original_name TEXT, size_bytes INTEGER, mime_type TEXT
  )
`);

console.log("Initalize Done! ٩(๑òωó๑)۶");
