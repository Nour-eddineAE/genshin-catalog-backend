const {
  validateBody,
  validateExistance,
} = require("../validators/weapon-body");
const validate = require("../middlewares/validate-request-body");
const Weapon = require("../models/weapon");
const express = require("express");

const router = express.Router();
const middlewares = [validate(validateBody)];

// get all weapons
router.get("/", async (request, response) => {
  const weapons = await Weapon.find().sort("name");
  response.send(weapons);
});

// get weapon by id
router.get("/:id", async (request, response) => {
  const weaponId = request.params.id;

  const weapon = await Weapon.findById(weaponId);

  if (!weapon) return response.status(400).send("No weapon with the given id");

  response.send(weapon);
});

// create a new weapon
router.post("/", middlewares, async (request, response) => {
  const weaponType = await validateExistance(request, response);

  let weapon = new Weapon({
    name: request.body.name,
    base_attack: request.body.base_attack,
    second_stat: request.body.second_stat,
    passive: request.body.passive,
    rarity: request.body.rarity,
    weaponType: weaponType,
    img: request.body.img,
  });
  weapon = await weapon.save();

  response.status(200).send(weapon);
});

// update an weapon
router.put("/:id", middlewares, async (request, response) => {
  const weaponType = await validateExistance(request, response);

  const weaponId = request.params.id;
  const weapon = await Weapon.findByIdAndUpdate(
    weaponId,
    {
      name: request.body.name,
      base_attack: request.body.base_attack,
      second_stat: request.body.second_stat,
      passive: request.body.passive,
      rarity: request.body.rarity,
      weaponType: weaponType,
      img: request.body.img,
    },
    { new: true }
  );

  if (!weapon) return response.status(400).send("No weapon with the given id");

  response.status(200).send(weapon);
});

// remove weapon
router.delete("/:id", async (request, response) => {
  const weaponId = request.params.id;

  const weapon = await Weapon.findByIdAndDelete(weaponId);
  if (!weapon) response.status(400).send("No weapon with the given id");

  response.send(weapon);
});

module.exports = router;
