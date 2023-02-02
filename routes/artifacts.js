const artifactValidator = require("../validators/artifact-body");
const validate = require("../middlewares/validate-request-body");
const Artifact = require("../models/artifact");
const express = require("express");

const router = express.Router();
const middlewares = [validate(artifactValidator)];

// get all artifacts
router.get("/", async (request, response) => {
  const artifacts = await Artifact.find().sort("name");
  response.status(200).send(artifacts);
});

// get artifact by id
router.get("/:id", async (request, response) => {
  const artifactId = request.params.id;

  const artifact = await Artifact.findById(artifactId);

  if (!artifact)
    return response.status(400).send("No artifact with the given id");

  response.send(artifact);
});

// create a new artifact
router.post("/", middlewares, async (request, response) => {
  let artifact = new Artifact({
    name: request.body.name,
    rarity: request.body.rarity,
    description: request.body.description,
    img: request.body.img,
  });
  artifact = await artifact.save();

  response.status(200).send(artifact);
});

// update an artifact
router.put("/:id", middlewares, async (request, response) => {
  const artifactId = request.params.id;
  const artifact = await Artifact.findByIdAndUpdate(
    artifactId,
    {
      name: request.body.name,
      rarity: request.body.rarity,
      description: request.body.description,
      img: request.body.img,
    },
    { new: true }
  );

  if (!artifact)
    return response.status(400).send("No artifact with the given id");

  response.status(200).send(artifact);
});

// remove artifact
router.delete("/:id", async (request, response) => {
  const artifactId = request.params.id;

  const artifact = await Artifact.findByIdAndDelete(artifactId);
  if (!artifact) response.status(400).send("No artifact with the given id");

  response.send(artifact);
});

module.exports = router;
