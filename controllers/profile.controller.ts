import errors from "../helpers/errors";
import { USER_FIELDS } from "../helpers/fields";
import messages from "../helpers/messages";
import actionModel from "../models/action.model";
import profileModel from "../models/profile.model";
import userModel from "../models/user.model";

export const getProfile = async (req, res) => {
  try {
    let org = await profileModel.find({
      organisation: req.user.organisation?._id,
    });
    res.json({ success: true, message: messages.SUCCESS, data: org });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const createProfile = async (req, res) => {
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
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const updateProfile = async (req, res) => {
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
    (profile as any).name = name;
    (profile as any).description = description;
    await (profile as any).save();
    res.json({ success: true, message: messages.SUCCESS, data: profile });
  } catch (error) {
    if ((error as Error).message === errors.NOT_FOUND) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const toggleProfile = async (req, res) => {
  const { id } = req.params;
  try {
    let profile = await profileModel.findOne({
      _id: id,
      organisation: req.user.organisation?._id,
    });
    (profile as any).isActive = !(profile as any).isActive;
    await (profile as any).save();
    res.json({ success: true, message: messages.SUCCESS });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const deleteProfile = async (req, res) => {
  const { id } = req.params;
  try {
    if (id === req.user.profile?._id) {
      throw new Error("Can't delete user's profile");
    }
    await profileModel.deleteOne({ _id: id, organisation: req.user.organisation?._id });
    res.json({ success: true, message: messages.SUCCESS });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const addUsersToProfile = async (req, res) => {
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
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
export const getUsersByProfile = async (req, res) => {
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
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
export const getActions = async (req, res) => {
  try {
    const actions = await actionModel
      .find()
      .transform((docs) => docs.map((doc) => doc.value));
    res.json({ success: true, message: messages.SUCCESS, data: actions });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
export const getActionsByProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const profile = await profileModel.findOne({
      _id: id,
      organisation: req.user.organisation?._id,
    });
    res.json({
      success: true,
      message: messages.SUCCESS,
      data: (profile as any).actions,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const addActionsToProfile = async (req, res) => {
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
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
