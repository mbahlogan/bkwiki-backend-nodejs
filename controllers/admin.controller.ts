import { USER_FIELDS } from "../helpers/fields";
import messages from "../helpers/messages";
import configModel from "../models/config.model";
import configlistModel from "../models/configlist.model";
import userModel from "../models/user.model";

export const getUsers = async (req, res) => {
  try {
    const users = await userModel
      .find({
        organisation: req.user.organisation?.id,
      })
      .populate(["organisation", "profile"])
      .select(USER_FIELDS);
    res.json({
      data: users,
      success: true,
      message: messages.SUCCESS,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
export const getAuthUser = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.user._id)
      .populate(["organisation", "profile"])
      .select(USER_FIELDS);
    res.json({
      data: user,
      success: true,
      message: messages.SUCCESS,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const addUser = async (req, res) => {
  let { fname, lname, phone, email, profile } = req.body;

  let pwd = process.env.ORG_PASS;

  try {
    await userModel.create({
      fname,
      lname,
      phone,
      email,
      profile,
      pwd,
      organisation: req.user?.organisation._id,
    } as any);

    res.json({
      message: "Successfully retrieved",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.json({ message: "An error occured", success: false });
  }
};

export const updateUser = async (req, res) => {
  let { fname, lname, phone, email } = req.body;
  try {
    let user: any = await userModel.findById(req.user._id);
    user.fname = fname;
    user.lname = lname;
    user.phone = phone;
    user.email = email;

    await user.save();

    return res.json({
      message: "Successfully retrieved",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.json({ message: "An error occured", success: false });
  }
};

export const deleteUser = async (req, res) => {
  let userId = req.params.id;
  try {
    await userModel.findByIdAndDelete(userId);
    return res.json({
      message: "Successfully retrieved",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.json({ message: "An error occured", success: false });
  }
};

export const disactivateUser = async (req, res) => {
  let userId = req.params.id;
  if (userId === req.user._id) {
    return res.json({
      message: "You cannot perform this action",
      success: false,
    });
  }

  try {
    console.log(userId);
    let user: any = await userModel.findById(userId);
    user.isActive = !user.isActive;
    await user.save();
    return res.json({
      message: "Successfully retrieved",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.json({ message: "An error occured", success: false });
  }
};

// export const resetUser = async (req, res) => {
//   let userId = req.params.id;

//   if (userId === req.user.id) {
//     return res.json({
//       message: "You cannot perform this action",
//       success: false,
//     });
//   }

//   try {
//     let password = "1234";
//     let user = await userModel.findOne({ where: { id: userId } });
//     user.user_pwd = hashed;
//     await user.save();

//     res.json({
//       message: "Successfully retrieved",
//       success: true,
//     });

//     // sendEmail({
//     //   to: user.email,
//     //   subject: "Account Alert",
//     //   html: `<p>Your account has been resetted by ${req.user.fname}. Your new password is <b>${password}</b></p>`,
//     // });
//   } catch (error) {
//     console.log(error);
//     return res.json({ message: "An error occured", success: false });
//   }
// };

export const addConfig = async (req, res) => {
  try {
    const { name, data } = req.body;
    let _data = await configlistModel.create({ data });
    let config = await configModel.create({
      name,
      data: _data.id as any,
      docModel: "ConfigList",
    });
    res.json({ data: config, success: true, message: "success" });
  } catch (error) {
    console.log(error);
    return res.json({ message: "An error occured", success: false });
  }
};
export const getConfig = async (_, res) => {
  try {
    let config = await configModel.find().populate("data")
    res.json({ data: config, success: true, message: "success" });
  } catch (error) {
    console.log(error);
    return res.json({ message: "An error occured", success: false });
  }
};
export const getConfigById = async (req, res) => {
  try {
    const { id } = req.params;
    let config = await configModel.findById(id).populate("data")
    res.json({ data: config, success: true, message: "success" });
  } catch (error) {
    console.log(error);
    return res.json({ message: "An error occured", success: false });
  }
};
