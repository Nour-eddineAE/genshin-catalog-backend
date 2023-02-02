const mongoose = require("mongoose");

const elementSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
});

const Element = mongoose.model("Element", elementSchema);

module.exports = {
  Element,
  elementSchema,
};
