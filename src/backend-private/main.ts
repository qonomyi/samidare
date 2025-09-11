import express from "ultimate-express";
import morgan from "morgan";
import uploadRouter from "./routes/upload.js";
import { getConfig, loadConfig } from "../utils/config.js";

const app = express();
app.enable("trust proxy");

app.use(morgan("combined"));

app.use("/upload", uploadRouter);

async function start() {
  await loadConfig();

  const config = getConfig();

  app.listen(config.private.port, () => {
    console.log(`Server listening on :${config.private.port}`);
  });
}

start();
