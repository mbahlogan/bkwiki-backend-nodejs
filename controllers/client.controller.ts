import Client from "../models/cards.model";
import { hashPassword, comparePassword } from "../utils/encryptions";
import sendEmail from "../emails";
import emailTemplate from "../emails/templates";
import organisationModel from "../models/organisation.model";
import messages from "../helpers/messages";

export const verifyUserEmail = async (req, res) => {
  try {
    let client = await Client.findById(req.user._id);
    (client as any).emailValidated = true;
    await (client as any).save();
    res.json({ message: "Email verified", success: true });
    sendEmail({
      to: (client as any).email,
      subject: "Account verification success",
      html: emailTemplate({
        text: "You have successfully verified your account!",
        heading: "Account verification successful",
        slug: "Fast and Reliable",
      }),
    }).catch((e) => {
      console.log("Error occured sending mail", e);
    });
  } catch (error) {
    console.log("verifyUserEmail", error);
    res.json({ message: "An error occured", success: false });
  }
};

export const resetPassword = async (req, res) => {
  const { password } = req.body;
  try {
    let hashed = await hashPassword(password);

    if (!hashed) {
      return res.json({ message: "An error occured", success: false });
    }

    let client = await Client.findById(req.user._id);
    (client as any).pwd = hashed;
    (client as any).emailValidated = true;
    await (client as any).save();

    res.json({ message: "Password reset successful", success: true });
    sendEmail({
      to: (client as any).email,
      subject: "Password Reset Successful",
      html: emailTemplate({
        text: "You have successfully changed your password",
        heading: "Password Changed Successfully",
        slug: "Fast And Reliable",
      }),
    });
  } catch (error) {
    console.log(error);
    res.json({ message: "Invalid token", success: false });
  }
};

export const getUserInfo = async (req, res) => {
  try {
    const clientData = await Client.findById(req.user._id).select([
      "fullName",
      "phone",
      "country",
      "email",
    ]);
    res.json({ message: "success", data: clientData, success: true });
  } catch (error) {
    console.log(error);
    res.json({ message: "An error occured", success: false });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { fullName, emailAddress, country, phoneNumber } = req.body;

    const client = await Client.findById(req.user._id).select([
      "fullName",
      "phone",
      "country",
      "email",
    ]);

    (client as any).fullName = fullName;
    (client as any).email = emailAddress;
    ((client as any).phone = phoneNumber), ((client as any).country = country);
    await (client as any).save();

    res.json({ message: "success", success: true });
  } catch (error) {
    console.log(error);
    res.json({ message: "An error occured", success: false });
  }
};

export const updateUserPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const client = await Client.findById(req.user._id);

    if (comparePassword(oldPassword, (client as any).pwd)) {
      let hashed = await hashPassword(newPassword);
      (client as any).pwd = hashed;
      await (client as any).save();
      res.json({ message: "success", success: true });
    } else {
      res.json({ success: false, message: "In valid password", status: "100" });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "An error occured", success: false });
  }
};

export const fetchOrgs = async (_, res) => {
  try {
    let org = await organisationModel
      .find()
      .ne("category", process.env.ADMIN_CATEGORY)
      .populate({path: "coverImage", select: "url"})
      .populate({path: "logo", select: "url"})
    res.json({ success: true, message: messages.SUCCESS, data: org });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const getOrgById = async (req, res) => {
  const { id } = req.params;
  try {
    let org = await organisationModel
      .findById(id)
      .populate({path: "coverImage", select: "url"})
      .populate({path: "logo", select: "url"})
    res.json({ success: true, message: messages.SUCCESS, data: org });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
