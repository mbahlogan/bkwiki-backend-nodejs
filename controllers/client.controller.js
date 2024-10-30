const Client = require("../models/cards.model");
const { hashPassword, comparePassword } = require("../utils/encryptions");
const sendEmail = require("../emails");
const emailTemplate = require("../emails/templates");
const organisationModel = require("../models/organisation.model");
const messages = require("../helpers/messages");

exports.verifyUserEmail = async (req, res) => {
  try {
    let client = await Client.findById(req.user._id);
    client.emailValidated = true;
    await client.save();
    res.json({ message: "Email verified", success: true });
    sendEmail({
      to: client.email,
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

exports.resetPassword = async (req, res) => {
  const { password } = req.body;
  try {
    let hashed = await hashPassword(password);

    if (!hashed) {
      return res.json({ message: "An error occured", success: false });
    }

    let client = await Client.findById(req.user._id);
    client.pwd = hashed;
    client.emailValidated = true;
    await client.save();

    res.json({ message: "Password reset successful", success: true });
    sendEmail({
      to: client.email,
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

exports.getUserInfo = async (req, res) => {
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

exports.updateUser = async (req, res) => {
  try {
    const { fullName, emailAddress, country, phoneNumber } = req.body;

    const client = await Client.findById(req.user._id).select([
      "fullName",
      "phone",
      "country",
      "email",
    ]);

    client.fullName = fullName;
    client.email = emailAddress;
    (client.phone = phoneNumber), (client.country = country);
    await client.save();

    res.json({ message: "success", success: true });
  } catch (error) {
    console.log(error);
    res.json({ message: "An error occured", success: false });
  }
};

exports.updateUserPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const client = await Client.findById(req.user._id);

    if (comparePassword(oldPassword, client.pwd)) {
      let hashed = await hashPassword(newPassword);
      client.pwd = hashed;
      await client.save();
      res.json({ message: "success", success: true });
    } else {
      res.json({ success: false, message: "In valid password", status: "100" });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "An error occured", success: false });
  }
};

exports.fetchOrgs = async (_, res) => {
  try {
    let org = await organisationModel
      .find()
      .ne("category", process.env.ADMIN_CATEGORY)
      .populate({path: "coverImage", select: "url"})
      .populate({path: "logo", select: "url"})
    res.json({ success: true, message: messages.SUCCESS, data: org });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getOrgById = async (req, res) => {
  const { id } = req.params;
  try {
    let org = await organisationModel
      .findById(id)
      .populate({path: "coverImage", select: "url"})
      .populate({path: "logo", select: "url"})
    res.json({ success: true, message: messages.SUCCESS, data: org });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
