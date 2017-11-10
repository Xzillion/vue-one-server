/**
 * Created by zouxiang19347 on 2017/11/10.
 */
"use strict";
var express = require("express");
var router = express.Router();
var http = require("http");
var monent = require("moment");
/* GET all movies. */
router.get("/", function (req, resOuter, next) {
  http.get("http://v3.wufazhuce.com:8000/api/all/list/5", (res) => {
    let chunkData = "";
    let movieList = {};
    res.on("data", (chunk) => {
      chunkData += chunk;
    });
    res.on("end", () => {
      JSON.parse(chunkData).html_content.replace(/allarticles=([\s\S]*);/g, (rs, $1) => {
        movieList = JSON.parse($1);
      });
      resOuter.json(movieList);
    });
  });
});
/* get movie by id*/
router.get("/:id", function (req, resUser, next) {
  http.get("http://v3.wufazhuce.com:8000/api/all/list/5", (res) => {
    let chunkData = "";
    let movieList = {};
    let movieItem = {};
    res.on("data", (chunk) => {
      chunkData += chunk;
    });
    res.on("end", () => {
      JSON.parse(chunkData).html_content.replace(/allarticles=([\s\S]*);/g, (rs, $1) => {
        movieList = JSON.parse($1);
        for (let x in movieList) {
          for (let y in movieList[x].list) {
            if (movieList[x].list[y].id == req.params.id) {
              movieItem = movieList[x].list[y];
              break;
            }
          }
          if (JSON.stringify(movieItem) !== "{}")
            break;
        }
      });
      resUser.json(movieItem);
    });
  });
});

/* get movies by month*/
router.get("/bymonth/:month", function (req, resUser, next) {
  http.get("http://v3.wufazhuce.com:8000/api/all/list/5", (res) => {
    let chunkData = "";
    let movieList = {};
    let movieItem = {};
    let monthParam = monent(req.params.month);
    if (!monthParam.isValid()){ // 判断日期是否合法
      resUser.json({errorCode:0, errorInfo: "Invalid Date"});
      return false;
    }
    res.on("data", (chunk) => {
      chunkData += chunk;
    });
    res.on("end", () => {
      JSON.parse(chunkData).html_content.replace(/allarticles=([\s\S]*);/g, (rs, $1) => {
        movieList = JSON.parse($1);
        for (let x in movieList) {
          if (movieList[x].month === monthParam.format("YYYY-MM")) {
            movieItem = movieList[x];
            break;
          }
        }
      });
      resUser.json(movieItem);
    });
  });
});
module.exports = router;
