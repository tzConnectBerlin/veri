const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const bodyParser = require("body-parser");
const getTezosAddress = require("./db.js");
const port = process.env.PORT || 5001;

const app = express();

app.use(logger("dev"));
app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("server is ready");
});

app.post("/:id", (req, res) => {
  getTezosAddress(req.params, res);
});

console.log(process.env);

app.listen(port, () => console.log("server is up"));
