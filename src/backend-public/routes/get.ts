import { Router } from "ultimate-express";
import type { Request, Response } from "ultimate-express";
import sqlite3 from "sqlite3";
import path from "path";
import morgan from "morgan";
import { filesize } from "filesize";

const router: Router = Router();

const root = process.cwd();
const db = new sqlite3.Database("./data/dbs/uploads.db");

type UploadRow = {
  id: string;
  dest: string;
  original_name: string;
  size_bytes: number;
  mime_type: string;
};

router.use(morgan("combined"));

router.get("/:id", (req: Request, res: Response) => {
  if (
    req.get("user-agent")?.toLowerCase().includes("bot") &&
    req.query.raw != ""
  ) {
    return res.redirect("api/bot/" + req.params.id);
  }

  const file = db.all(
    "SELECT * FROM uploads WHERE id = ?",
    [req.params.id],
    (err, row: UploadRow[]) => {
      const file = row[0];
      if (!file) {
        return res.status(404).send("Not Found");
      }
      const filePath = path.join(root, "data", "uploads", file["dest"]);

      return res.download(filePath, file["original_name"]);
    },
  );
});

router.get("/api/bot/:id", (req: Request, res: Response) => {
  db.all(
    "SELECT * FROM uploads WHERE id = ?",
    [req.params.id],
    (err, row: UploadRow[]) => {
      const file = row[0];
      if (!file) {
        return res.status(404).send("Not Found");
      }

      const filePath = path.join(root, "data", "uploads", file["dest"]);

      let ogImage = `
            <meta
              property="og:image"
              content="https://icons.veryicon.com/png/o/system/dan_system/file-60.png"
            />
      `;

      if (file.mime_type.match("^(image).*$")) {
        ogImage = `
            <meta
              property="og:image"
              content="/api/raw/${file.dest}"
            />
            <meta property="og:image:type" content="${file.mime_type}">
            <meta property="twitter:card" content="summary_large_image">
        `;
      }

      if (file.mime_type.match("^(video).*$")) {
        ogImage = `
            <meta
              property="og:video:url"
              content="/api/raw/${file.dest}"
            />
            <meta
              property="og:video:secure_url"
              content="/api/raw/${file.dest}"
            />
            <meta property="og:type" content="video.other">
        `;
      }

      const html = `
        <!doctype html>
        <html lang="en">
          <head>
            <meta
              property="og:site_name"
              content="[insert good name here] - private file uploader"
            />
            <meta property="og:url" content="" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="${file.original_name}" />
            <meta property="og:description" content="Size: ${filesize(file.size_bytes)}" />
            ${ogImage}
            <meta property="og:image:type" content="image/png" />
            <meta name="theme-color" content="#bf4c45" />
          </head>
          <body>
            <a href=/raw/${req.params.id}?raw>Download</a>
          </body>
        </html>
        `;
      return res.send(html);
    },
  );
});

export default router;
