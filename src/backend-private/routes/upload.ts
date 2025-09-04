import { Router } from "ultimate-express";
import type { Request, Response } from "ultimate-express";
import multer, { type Multer } from "multer";
import path from "path";
import crypto from "crypto";
import sqlite3 from "sqlite3";

const router: Router = Router();

const root = process.cwd();
const generateHexId = (): string => {
  return crypto.randomBytes(4).toString("hex");
};

const db = new sqlite3.Database("./data/dbs/uploads.db");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(root, "data", "uploads");
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const id = generateHexId();
    cb(null, id + "-" + file.originalname);
  },
});

const upload: Multer = multer({ storage });

// @ts-ignore
router.post("/", upload.single("file"), (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const id = req.file.filename.split("-")[0];
    const dest = req.file.filename;
    const originalName = req.file.originalname;
    const bytes = req.file.size;

    db.serialize(() => {
      db.run("INSERT INTO uploads VALUES(?, ?, ?, ?)", [
        id,
        dest,
        originalName,
        bytes,
      ]);
    });

    return res.status(200).json({ url: `https://example.com/${id}` }); // TODO: Hostにする
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
