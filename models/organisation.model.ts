import mongoose from "mongoose";

const Organisation = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
  },
  language: String,
  description: String,
  localName: String,
  mainShareholder: String,
  percentShareholder: Number,
  namePCA: String,
  nameDG: String,
  headquarter: String,
  branchCount: Number,
  atmCount: Number,
  customerCount: Number,
  postal: String,
  contact: [String],
  email: String,
  website: String,
  type: String,

  logo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Files"
  },
  coverImage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Files"
  },
  mobileBanking: [{ name: String, url: String, description: String }],
  category: {
    type: String,
    required: true,
    immutable: true,
    default: process.env.CLIENT_CATEGORY,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  created: { type: Date, default: () => new Date(), immutable: true },
  updated: { type: Date, default: () => new Date() },
});

Organisation.statics.findByOrg = function (name, category) {
  return this.findOne({ name, category });
};

export default mongoose.model("Organisations", Organisation);
