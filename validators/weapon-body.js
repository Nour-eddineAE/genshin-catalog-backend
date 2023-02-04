const Joi = require("joi");
const { WeaponType } = require("../models/weapon-type");

module.exports.validateBody = (body) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(40),
    base_attack: Joi.number().required().min(0).max(100),
    second_stat: Joi.string().required().min(3).max(40),
    passive: Joi.string().required().min(3).max(1000),
    rarity: Joi.number().required().min(0).max(5),
    weaponTypeName: Joi.string().required().min(3).max(20),
    img: Joi.string().required().min(3).max(200),
  });
  return schema.validate(body);
};

module.exports.validateExistance = async (request, response) => {
  const weaponType = await WeaponType.findOne({
    name: request.body.weaponTypeName,
  });
  if (!weaponType)
    return response.status(400).send("No weapon type with the given name");
  return weaponType;
};
