const mongoose = require("mongoose");
const { weaponTypeSchema } = require("./weapon-type");

const weaponSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 40,
  },
  base_attack: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  second_stat: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 40,
  },
  passive: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 200,
  },

  rarity: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  weaponType: {
    type: weaponTypeSchema,
  },
  img: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 200,
  },
});

const Weapon = mongoose.model("Weapon", weaponSchema);

module.exports = Weapon;
