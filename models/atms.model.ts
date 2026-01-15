import mongoose from "mongoose";

const ATM = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  services: [String],
  image: {
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

export default mongoose.model("atms", ATM);
