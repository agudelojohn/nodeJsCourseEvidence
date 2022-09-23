const express = require("express");
const fs = require("fs");

const app = express();
const appVersion = "v1";

const data = JSON.parse(fs.readFileSync(`${__dirname}/data/tours-simple.json`));

app.get(`/api/${appVersion}/tours`, async (req, res) => {
  res.status(200).json({
    status: "success",
    results: data.length,
    data: { tours: data },
  });
});

const port = 3000;
app.listen(port, () => {
  console.log("Running on port 3000");
});
