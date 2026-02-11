const Artifact = require("../model/artifact.model");

exports.createArtifact = async (req, res) => {
  try {
    const { title, description } = req.body;
    const artifact = await Artifact.create({
      title,
      description,
      createdBy: req.user?._id,
    });
    return res.status(201).json(artifact);
  } catch (err) {
    return res.status(500).json({ message: err?.message || "Failed to create artifact" });
  }
};

exports.listArtifacts = async (req, res) => {
  try {
    const artifacts = await Artifact.find()
      .sort({ createdAt: -1 })
      .populate("createdBy", "_id email");
    return res.json(artifacts);
  } catch (err) {
    return res.status(500).json({ message: err?.message || "Failed to fetch artifacts" });
  }
};

exports.getArtifact = async (req, res) => {
  try {
    const artifact = await Artifact.findById(req.params.id).populate(
      "createdBy",
      "_id email"
    );
    if (!artifact) return res.status(404).json({ message: "Artifact not found" });
    return res.json(artifact);
  } catch (err) {
    return res.status(500).json({ message: err?.message || "Failed to fetch artifact" });
  }
};

exports.updateArtifact = async (req, res) => {
  try {
    const artifact = await Artifact.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!artifact) return res.status(404).json({ message: "Artifact not found" });
    return res.json(artifact);
  } catch (err) {
    return res.status(500).json({ message: err?.message || "Failed to update artifact" });
  }
};

exports.deleteArtifact = async (req, res) => {
  try {
    const artifact = await Artifact.findByIdAndDelete(req.params.id);
    if (!artifact) return res.status(404).json({ message: "Artifact not found" });
    return res.json({ message: "Artifact deleted" });
  } catch (err) {
    return res.status(500).json({ message: err?.message || "Failed to delete artifact" });
  }
};
