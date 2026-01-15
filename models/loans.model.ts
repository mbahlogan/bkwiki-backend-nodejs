import mongoose from "mongoose";

const Loans = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  features: [String],
  requirements: [String],
  stepsToApply: [String],
  eligeble: [String],
  customers: [String],
  minAmount: String,
  maxAmount: String,
  minDuration: String,
  maxDuration: String,
  interestRate: String,
  fee: [String],
  applyLink: String,
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Files",
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

export default mongoose.model("loans", Loans);
