const {
  validateBody,
  validateExistance,
} = require("../validators/character-body");
const validate = require("../middlewares/validate-request-body");
const Character = require("../models/character");
const express = require("express");

const router = express.Router();
const middlewares = [validate(validateBody)];

// get all characters
router.get("/", async (request, response) => {
  const characters = await Character.find().sort("element.name");
  response.send(characters);
});

// get character by id
router.get("/:id", async (request, response) => {
  const characterId = request.params.id;

  const character = await Character.findById(characterId);

  if (!character)
    return response.status(400).send("No character with the given id");

  response.send(character);
});

// create a new character
router.post("/", middlewares, async (request, response) => {
  const { region, element, weaponType } = await validateExistance(
    request,
    response
  );
  let character = new Character({
    name: request.body.name,
    region,
    element,
    weaponType,
    rarity: request.body.rarity,
    description: request.body.description,
    imgFull: request.body.imgFull,
    imgSmall: request.body.imgSmall,
  });
  character = await character.save();

  response.status(200).send(character);
});

// update an character
router.put("/:id", middlewares, async (request, response) => {
  const { region, element, weaponType } = await validateExistance(
    request,
    response
  );
  const characterId = request.params.id;
  const character = await Character.findByIdAndUpdate(
    characterId,
    {
      name: request.body.name,
      region,
      element,
      weaponType,
      rarity: request.body.rarity,
      description: request.body.description,
      imgFull: request.body.imgFull,
      imgSmall: request.body.imgSmall,
    },
    { new: true }
  );

  if (!character)
    return response.status(400).send("No character with the given id");

  response.status(200).send(character);
});

// remove character
router.delete("/:id", async (request, response) => {
  const characterId = request.params.id;

  const character = await Character.findByIdAndDelete(characterId);
  if (!character) response.status(400).send("No character with the given id");

  response.send(character);
});

module.exports = router;
