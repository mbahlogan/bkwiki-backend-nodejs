import mongoose from "mongoose";
import { hashPassword, comparePassword } from "../utils/encryptions";
import errors from "../helpers/errors";

const User = new mongoose.Schema({
  fname: String,
  lname: String,
  phone: String,
  email: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
    lower: true,
  },
  pwd: {
    type: String,
    required: true,
    // select: false // Usually good practice to not select password by default
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
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profiles",
  },
  created: { type: Date, default: () => new Date(), immutable: true },
  updated: { type: Date, default: () => new Date() },
});

User.virtual("name").get(function () {
  return `${this.fname} ${this.lname}`;
});

User.statics.isValidUser = async function (email, password) {
  try {
    const user = await this.findOne({ email });
    console.log(user);
    if (!user) throw new Error(errors.INCORRECT_CREDENTIAL); // Added check for user existence
    let isValid = comparePassword(password, user.pwd);
    if (!isValid) {
      throw new Error(errors.INCORRECT_CREDENTIAL);
    }

    return Promise.resolve(user);
  } catch (error) {
    return Promise.reject(error);
  }
};

User.pre("save", async function (next: any) {
  try {
    if (this.isModified("pwd")) {
      console.log("HASH PASSWORD");
      const hashedPassword = await hashPassword(this.pwd);
      this.pwd = hashedPassword;
      next();
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
});

export default mongoose.model("Users", User);
