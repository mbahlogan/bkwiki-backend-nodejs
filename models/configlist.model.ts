import mongoose from "mongoose";

const ConfigList = new mongoose.Schema({
  data: {},
  created: { type: Date, default: () => new Date(), immutable: true },
  updated: { type: Date, default: () => new Date() },
});

export default mongoose.model("ConfigList", ConfigList);
