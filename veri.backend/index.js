const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const bodyParser = require("body-parser");
const { request_nft } = require("./business.js");
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

app.post("/veri", async (req, res) => {
  console.log(req.body);
  let ip = req.headers['x-forwarded-for'];
  return await request_veri(req.body, ip, res);
});

app.post("/drop", async (req, res) => {
  console.log(req.body);
  let ip = req.headers['x-forwarded-for'];
  return await request_drop(req.body, ip, res);
});

app.listen(port, () => console.log("server is up on port", port));
