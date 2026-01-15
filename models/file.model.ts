import mongoose from "mongoose";

const Files = new mongoose.Schema({
  name: String,
  fileId: String,
  mimetype: String,
  url: String,
  created: { type: Date, default: () => new Date(), immutable: true},
  updated: { type: Date, default: () => new Date() }
});

export default mongoose.model("Files", Files);
