const mongoose = require("mongoose");

const Cards = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  features: [String],
  requirements: [String],
  additionalFeatures: [String],
  eligeble: [String],
  stepsToApply: [String],
  services: [String],
  fees: [],
  limits: [],
  isActive: {
    type: Boolean,
    default: true,
  },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Files",
  },
  organisation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organisations",
    required: true,
    immutable: true,
  },
  applyLink: String,
  created: { type: Date, default: () => new Date(), immutable: true },
  updated: { type: Date, default: () => new Date() },
});

module.exports = mongoose.model("cards", Cards);
