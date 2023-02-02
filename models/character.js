const mongoose = require("mongoose");
const { regionSchema } = require("./region");
const { weaponTypeSchema } = require("./weapon-type");
const { elementSchema } = require("./element");

const characterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
  region: {
    type: regionSchema,
  },
  rarity: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  element: {
    type: elementSchema,
  },
  weaponType: {
    weaponTypeSchema,
  },
  description: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 250,
  },
  imgSmall: { type: String, required: true, minlength: 3, maxlength: 200 },
  imgFull: { type: String, required: true, minlength: 3, maxlength: 200 },
});

const Character = mongoose.model("Character", characterSchema);

module.exports = Character;
