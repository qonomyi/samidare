import express from "ultimate-express";
import morgan from "morgan";
import uploadRouter from "./routes/upload.js";

const app = express();
const port = 3001;

app.use(morgan("combined"));

app.use("/upload", uploadRouter);

app.listen(port, () => {
  console.log(`Server listening on :${port}`);
});
