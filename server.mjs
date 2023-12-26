import express from "express";
import path from "path";

const app = express();
const port = 3000;

const __dirname = path.resolve(path.dirname(""));

app.use("/", (_, res) => {
  res.sendFile(path.join(__dirname, "data.xml"), {
    headers: { "Access-Control-Allow-Origin": "*" },
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
