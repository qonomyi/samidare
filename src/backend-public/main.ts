import express from "ultimate-express";
import getRouter from "./routes/get.js";
import morgan from "morgan";

const app = express();
const port = 3000;

app.use(morgan("combined"));
app.use("/", getRouter);

app.listen(port, () => {
  console.log(`Server listening on :${port}`);
});
