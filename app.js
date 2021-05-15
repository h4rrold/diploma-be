const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.end("Hey");
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
