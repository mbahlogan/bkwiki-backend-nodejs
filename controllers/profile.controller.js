const errors = require("../helpers/errors");
const { USER_FIELDS } = require("../helpers/fields");
const messages = require("../helpers/messages");
const actionModel = require("../models/action.model");
const profileModel = require("../models/profile.model");
const userModel = require("../models/user.model");

exports.getProfile = async (req, res) => {
  try {
    let org = await profileModel.find({
      organisation: req.user.organisation?._id,
    });
    res.json({ success: true, message: messages.SUCCESS, data: org });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createProfile = async (req, res) => {
  const { name, description, actions } = req.body;
  try {
    let profile = await profileModel.create({
      name,
      description,
      actions,
      organisation: req.user.organisation?._id,
    });
    res.json({ success: true, message: messages.SUCCESS, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    let profile = await profileModel.findOne({
      _id: id,
      organisation: req.user.organisation?._id,
    });
    if (!profile) {
      throw new Error(errors.NOT_FOUND);
    }
    profile.name = name;
    profile.description = description;
    await profile.save();
    res.json({ success: true, message: messages.SUCCESS, data: profile });
  } catch (error) {
    if (error.message === errors.NOT_FOUND) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.toggleProfile = async (req, res) => {
  const { id } = req.params;
  try {
    let profile = await profileModel.findOne({
      _id: id,
      organisation: req.user.organisation?._id,
    });
    profile.isActive = !profile.isActive;
    await profile.save();
    res.json({ success: true, message: messages.SUCCESS });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteProfile = async (req, res) => {
  const { id } = req.params;
  try {
    if (id === req.user.profile?._id) {
      throw new Error("Can't delete user's profile");
    }
    await profileModel.deleteOne({ _id: id, organisation: req.user.organisation?._id });
    res.json({ success: true, message: messages.SUCCESS });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.addUsersToProfile = async (req, res) => {
  const { users = [] } = req.body;
  const { id } = req.params;
  try {
    await userModel.updateMany(
      {
        organisation: req.user.organisation?._id,
        profile: id,
      },
      {
        profile: null,
      }
    );
    await userModel.updateMany(
      {
        organisation: req.user.organisation?._id,
        _id: {
          $in: users,
        },
      },
      {
        profile: id,
      }
    );
    res.json({ success: true, message: messages.SUCCESS });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
exports.getUsersByProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const users = await userModel
      .find({
        profile: id,
        organisation: req.user.organisation?._id,
      })
      .select(USER_FIELDS);

    res.json({ success: true, message: messages.SUCCESS, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
exports.getActions = async (req, res) => {
  try {
    const actions = await actionModel
      .find()
      .transform((docs) => docs.map((doc) => doc.value));
    res.json({ success: true, message: messages.SUCCESS, data: actions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
exports.getActionsByProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const profile = await profileModel.findOne({
      _id: id,
      organisation: req.user.organisation?._id,
    });
    res.json({
      success: true,
      message: messages.SUCCESS,
      data: profile.actions,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.addActionsToProfile = async (req, res) => {
  const { actions = [] } = req.body;
  const { id } = req.params;
  try {
    await profileModel.updateMany(
      {
        organisation: req.user.organisation?._id,
        _id: id,
      },
      {
        actions: [],
      }
    );
    await profileModel.updateMany(
      {
        organisation: req.user.organisation?._id,
        _id: id,
      },
      {
        actions: actions,
      }
    );
    res.json({ success: true, message: messages.SUCCESS });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
