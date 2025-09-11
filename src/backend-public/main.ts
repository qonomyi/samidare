import express from "ultimate-express";
import getRouter from "./routes/get.js";
import morgan from "morgan";

const app = express();
const port = 3000;

app.use(morgan("combined"));
const root = process.cwd();

app.get("/", (req, res) => {
  res.sendFile(root + "/data/assets/public-root/index.html");
});

app.get("/favicon.ico", (req, res) => {
  res.sendFile(root + "/data/assets/favicon.ico");
});

app.use("/", getRouter);
app.use("/api/raw/", express.static("data/uploads"));

app.use("/assets", express.static("data/assets"));

app.listen(port, () => {
  console.log(`Server listening on :${port}`);
});
