import mongoose from "mongoose";

const ConfigValue = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
  },
  data: mongoose.Schema.Types.Mixed,
  isActive: {
    type: Boolean,
    default: true,
  },
  created: { type: Date, default: () => new Date(), immutable: true },
  updated: { type: Date, default: () => new Date() },
});

export default mongoose.model("ConfigValue", ConfigValue);
