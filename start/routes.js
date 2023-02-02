const characters = require("../routes/characters");
const artifacts = require("../routes/artifacts");
const weapons = require("../routes/weapons");
const express = require("express");

module.exports = (app) => {
  // enable request body parsing
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/api/characters" || "/", characters);
  app.use("/api/artifacts", artifacts);
  app.use("/api/weapons", weapons);
};
