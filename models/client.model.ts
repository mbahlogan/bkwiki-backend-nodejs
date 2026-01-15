import mongoose from "mongoose";
import { hashPassword, comparePassword } from "../utils/encryptions";
import sendEmail from "../emails";
import emailTemplate from "../emails/templates";
import errors from "../helpers/errors";
const Client = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
  },
  pwd: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isEmailValidated: {
    type: Boolean,
    default: false,
  },
  otp: String,
  created: { type: Date, default: () => new Date(), immutable: true },
  updated: { type: Date, default: () => new Date() },
});

Client.virtual("name").get(function () {
  return `${this.fname} ${this.lname}`;
});

Client.statics.isValidUser = async function (email, password) {
  try {
    const user = await this.findOne({ email });
    let isValid = comparePassword(password, user.pwd);
    if (!isValid) {
      throw new Error(errors.INCORRECT_CREDENTIAL);
    }

    return Promise.resolve(user);
  } catch (error) {
    return Promise.reject(error);
  }
};
Client.statics.isValidOTP = async function (id, otp) {
  try {
    const user = await this.findById(id);
    console.log(user);
    if (user.otp == otp) {
      user.otp = null;
      user.isEmailValidated = true;
      await user.save();
      return Promise.resolve(true);
    } else {
      return Promise.reject(new Error(errors.OTP_NOT_VALID));
    }
  } catch {
    return Promise.reject(new Error(errors.OTP_NOT_VALID));
  }
};

Client.pre("save", async function (next: any) {
  try {
    if (this.isModified("pwd")) {
      const hashedPassword = await hashPassword(this.pwd);
      this.pwd = hashedPassword;
      next();
    }
    this.$locals.wasNew = this.isNew;
    next();
  } catch (error) {
    next(error);
  }
});

Client.post("save", async function () {
  if (this.$locals.wasNew) {
    sendEmail({
      to: this.email,
      subject: "Account verification",
      html: emailTemplate.register(this.otp),
    }).catch((error) => {
      console.log(error);
    });
    await this.updateOne({ isNew: false });
  }
});

export default mongoose.model("Clients", Client);
