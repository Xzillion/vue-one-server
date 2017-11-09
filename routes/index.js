var express = require("express");
var router = express.Router();
var http = require("http");

/* GET home page. */
router.get("/", function(req, res, next) {
  http.get("http://v3.wufazhuce.com:8000/api/all/list/5", (res) => {
    let chunkData = "";
    res.on("data", (chunk) => {
      chunkData += chunk;
    });
    res.on("end", () => {
      console.log(chunkData);
    });
  });
  res.render("index", { title: "Express" });
});

module.exports = router;
