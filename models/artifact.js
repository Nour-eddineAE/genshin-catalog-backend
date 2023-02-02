const mongoose = require("mongoose");

const artifactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 40,
  },
  description: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 250,
  },
  rarity: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  img: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 200,
  },
});

const Artifact = mongoose.model("Artifact", artifactSchema);

module.exports = Artifact;
