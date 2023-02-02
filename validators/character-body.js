const Joi = require("joi");
const { Region } = require("../models/region");
const { WeaponType } = require("../models/weapon-type");
const { Element } = require("../models/element");

module.exports.validateBody = (body) => {
  // we use names for searching elements, regions, and weapon types,
  // it's more practical than using ids
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(20),
    regionName: Joi.string().required().min(3).max(20),
    rarity: Joi.number().required().min(0).max(5),
    elementName: Joi.string().required().min(3).max(20),
    weaponTypeName: Joi.string().required().min(3).max(20),
    description: Joi.string().required().min(3).max(250),
    imgSmall: Joi.string().required().min(3).max(200),
    imgFull: Joi.string().required().min(3).max(200),
  });
  return schema.validate(body);
};

module.exports.validateExistance = async (request, response) => {
  const region = await Region.findOne({ name: request.body.regionName });
  if (!region)
    return response.status(400).send("No region with the given name");

  const element = await Element.findOne({ name: request.body.elementName });
  if (!element)
    return response.status(400).send("No element with the given name");

  const weaponType = await WeaponType.findOne({
    name: request.body.weaponTypeName,
  });
  if (!weaponType)
    return response.status(400).send("No weapon type with the given name");

  return { region, element, weaponType };
};
