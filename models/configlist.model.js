const mongoose = require("mongoose");

const ConfigList = new mongoose.Schema({
  data: {},
  created: { type: Date, default: () => new Date(), immutable: true },
  updated: { type: Date, default: () => new Date() },
});

module.exports = mongoose.model("ConfigList", ConfigList);
