const mongoose = require("mongoose");

const Profile = new mongoose.Schema({
  name: {
    type: String,
    required: true,

  },
  description: String,
  actions: [String],
  organisation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organisations",
    required: true,
    immutable: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  created: { type: Date, default: () => new Date(), immutable: true },
  updated: { type: Date, default: () => new Date() },
});

Profile.statics.findByOrg = function (orgId) {
  return this.find({ organisation: orgId });
};

Profile.statics.findByUser = function (name, organisation) {
  return this.findOne({ name, organisation });
};

module.exports = mongoose.model("Profiles", Profile);
