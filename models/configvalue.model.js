const mongoose = require("mongoose");

const ConfigValue = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
  },
  data: any,
  isActive: {
    type: Boolean,
    default: true,
  },
  created: { type: Date, default: () => new Date(), immutable: true },
  updated: { type: Date, default: () => new Date() },
});

module.exports = mongoose.model("ConfigValue", ConfigValue);
