import express from "ultimate-express";
import morgan from "morgan";
import uploadRouter from "./routes/upload.js";
import { loadConfig } from "../utils/config.js";

const app = express();
const port = 3001;

app.use(morgan("combined"));

app.use("/upload", uploadRouter);

async function start() {
  await loadConfig();

  app.listen(port, () => {
    console.log(`Server listening on :${port}`);
  });
}

start();
