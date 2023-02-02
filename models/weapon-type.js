const mongoose = require("mongoose");

const weaponTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
});

const WeaponType = mongoose.model("WeaponType", weaponTypeSchema);

module.exports = {
  WeaponType,
  weaponTypeSchema,
};
