const mongoose = require("mongoose");

const OrganisationType = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
  },
  description: String,
  isActive: {
    type: Boolean,
    default: true,
  },
  created: { type: Date, default: () => new Date(), immutable: true },
  updated: { type: Date, default: () => new Date() },
});

module.exports = mongoose.model("OrganisationTypes", OrganisationType);
