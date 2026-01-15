import mongoose from "mongoose";

const Config = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
  },
  data: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    refPath: 'docModel'
  },
  docModel: {
    type: String,
    required: true,
    enum: ['ConfigList', 'ConfigValue']
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  created: { type: Date, default: () => new Date(), immutable: true },
  updated: { type: Date, default: () => new Date() },
});

export default mongoose.model("Config", Config);
