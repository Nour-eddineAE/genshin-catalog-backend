const Joi = require("joi");

module.exports = (body) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(40),
    rarity: Joi.number().required().min(0).max(5),
    description: Joi.string().required().min(3).max(1000),
    img: Joi.string().required().min(3).max(200),
  });
  return schema.validate(body);
};
