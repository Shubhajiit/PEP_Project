const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middlware");
const artifactController = require("../controllers/artifact.controllers");

router.get("/", artifactController.listArtifacts);
router.get("/:id", artifactController.getArtifact);
router.post("/", auth, artifactController.createArtifact);
router.patch("/:id", auth, artifactController.updateArtifact);
router.delete("/:id", auth, artifactController.deleteArtifact);

module.exports = router;
