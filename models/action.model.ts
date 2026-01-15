import mongoose from "mongoose";

const Action = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
    immutable: true
  },
  value: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
    immutable: true
  },
  category: String,
  created: { type: Date, default: () => new Date(), immutable: true },
  updated: { type: Date, default: () => new Date() },
});

export default mongoose.model("Actions", Action);
