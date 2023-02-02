const mongoose = require("mongoose");

const regionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
});

const Region = mongoose.model("Region", regionSchema);

module.exports = {
  Region,
  regionSchema,
};
