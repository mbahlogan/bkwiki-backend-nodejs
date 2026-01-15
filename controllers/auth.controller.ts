import jwt from "jsonwebtoken";
import User from "../models/user.model";
import errors from "../helpers/errors";
import organisationModel from "../models/organisation.model";
import profileModel from "../models/profile.model";
import messages from "../helpers/messages";
import clientModel from "../models/client.model";
import otpGenerator from "otp-generator";
import actionModel from "../models/action.model";

export const signupAdmin = async (req, res) => {
  let { fname, lname, email, phone, pwd, org } = req.body;
  let profile;
  let orgId = org;
  try {
    if (!orgId) {

      org = await (organisationModel as any).findByOrg(
        process.env.ADMIN_ORG_NAME,
        process.env.ADMIN_CATEGORY
      );

      let admins = await (User as any).find({ organisation: org._id });
      if (admins.length > 0) throw new Error("Admin already exist");

      orgId = org._id;

      profile = await (profileModel as any).findByUser(
        process.env.ADMIN_CATEGORY,
        org._id
      );
    } else {
      let admins = await (User as any).find({ organisation: orgId });
      if (admins.length > 0) throw new Error("Admin already exist");

      const actions = await actionModel.find();
      profile = await (profileModel as any).create({
        name: process.env.ADMIN_CATEGORY,
        description: process.env.ADMIN_CATEGORY,
        organisation: orgId,
        actions: actions.map((a) => a.value),
      });
    }

    await (User as any).create({
      email,
      fname,
      lname,
      phone,
      profile: profile._id,
      pwd,
      organisation: orgId,
    });

    res.json({ message: "Client successfully created!", success: true });
  } catch (error) {
    res.json({ message: (error as Error).message ?? "An error occured", success: false });
  }
};

export const loginAdmin = async (req, res) => {
  const { email, pwd } = req.body;

  try {
    const user = await (User as any).isValidUser(email, pwd);
    const profile = await (profileModel as any).findById(user.profile);
    const org = await (organisationModel as any).findById(user.organisation).populate("logo")
    const jwtUser = JSON.stringify({ id: user._id, email: user.email });
    const token = jwt.sign({ user: jwtUser }, process.env.JWT_SECRET || "");
    res.status(201).json({
      message: messages.SUCCESS,
      success: true,
      data: {
        user: {
          name: user.name,
          profile: {
            name: profile.name,
            description: profile.description,
            actions: profile.actions,
          },
          org: {
            name: org.name,
            logo: {
              id: org.logo?.id,
              url: org.logo?.url,

            },
            description: org.description,
          }
        },
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Incorrect credential",
      code: errors.INCORRECT_CREDENTIAL,
      success: false,
    });
  }
};

export const signupClient = async (req, res) => {
  const { fname, lname, phone, email, pwd } = req.body;

  try {
    const otp = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      specialChars: false,
      upperCaseAlphabets: false,
    });

    const client = await (clientModel as any).create({
      fname,
      lname,
      email,
      phone,
      pwd,
      otp,
    });
    res.json({
      message: messages.SUCCESS,
      success: true,
      data: {
        id: client._id,
        name: client.name,
      },
    });
  } catch (error) {
    res.json({
      message: (error as Error).message || errors.ERROR_OCCURED,
      keyPattern: (error as any).keyPattern,
      code: (error as any).code,
      success: false,
    });
  }
};

export const loginClient = async (req, res) => {
  const { email, pwd } = req.body;
  try {
    let client = await (clientModel as any).isValidUser(email, pwd);

    if (!client.isActive) throw new Error(errors.ACCOUNT_NOT_ACTIVE);
    if (!client.isEmailValidated) throw new Error(errors.ACCOUNT_NOT_VERIFIED);

    const jwtUser = JSON.stringify({ id: client._id });
    const token = jwt.sign({ user: jwtUser }, process.env.JWT_SECRET || "");
    res.status(201).json({
      message: messages.SUCCESS,
      success: true,
      data: {
        client: {
          name: client.name,
          email: client.email,
          phone: client.phone,
        },
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: errors.INCORRECT_CREDENTIAL,
      message: "Incorrect credential",
      success: false,
    });
  }
};

export const verifyAccount = async (req, res) => {
  const { id } = req.params;
  const { otp } = req.body;
  try {
    const isValid = await (clientModel as any).isValidOTP(id, otp);

    if (!isValid) {
      throw new Error(errors.OTP_NOT_VALID);
    }
    res.json({
      message: messages.SUCCESS,
      success: true,
    });
  } catch (error) {
    console.log((error as Error).message);
    res.json({ message: (error as Error).message, success: false });
  }
};
