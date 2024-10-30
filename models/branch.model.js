const mongoose = require("mongoose");

const Branch = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  services: [String],
  description: String,
  contact: [String],
  manager: String,
  image: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Files",
    },
  country: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  },
  latitude: {
    type: String,
    required: true,
  },

  openTime: {
    type: String,
    required: true,
  },
  closeTime: {
    type: String,
    required: true,
  },

  isActive: {
    type: Boolean,
    default: true,
  },
  organisation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organisations",
    required: true,
    immutable: true,
  },
  created: { type: Date, default: () => new Date(), immutable: true },
  updated: { type: Date, default: () => new Date() },
});

module.exports = mongoose.model("branch", Branch);
