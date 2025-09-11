import express from "ultimate-express";
import getRouter from "./routes/get.js";
import morgan from "morgan";
import { loadConfig, getConfig } from "../utils/config.js";

const app = express();
app.enable("trust proxy");

const root = process.cwd();

app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.sendFile(root + "/data/assets/public-root/index.html");
});

app.get("/favicon.ico", (req, res) => {
  res.sendFile(root + "/data/assets/favicon.ico");
});

app.use("/", getRouter);
app.use("/api/raw/", express.static("data/uploads"));

app.use("/assets", express.static("data/assets"));

async function start() {
  await loadConfig();

  const config = getConfig();

  app.listen(config.public.port, () => {
    console.log(`Server listening on :${config.public.port}`);
  });
}

start();
