const branchModel = require("../models/branch.model");
const messages = require("../helpers/messages");
const { getSearchObject } = require("../helpers");

exports.createBranch = async (req, res) => {
  const {
    name,
    description,
    country,
    region,
    city,
    address,
    longitude,
    latitude,
    closeTime,
    openTime,
    manager,
    contact,
    image,
    services,
  } = req.body;
  try {
    let branch = await branchModel.create({
      name,
      description,
      image,
      address,
      city,
      country,
      latitude,
      longitude,
      region,
      closeTime,
      openTime,
      manager,
      organisation: req.user.organisation?._id,
      services,
      contact,
    });
    res.json({ success: true, message: messages.SUCCESS, data: branch });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
exports.updateBranch = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    country,
    region,
    city,
    address,
    longitude,
    latitude,
    closeTime,
    openTime,
    manager,
    contact,
    files,
    services,
  } = req.body;
  try {
    await branchModel.updateOne(
      { _id: id, organisation: req.user.organisation?._id },
      {
        name,
        description,
        services,
        files,
        address,
        city,
        country,
        latitude,
        longitude,
        region,
        closeTime,
        openTime,
        manager,
        contact,
      }
    );
    res.json({ success: true, message: messages.SUCCESS });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteBranch = async (req, res) => {
  const { id } = req.params;
  try {
    await branchModel.deleteOne({
      _id: id,
      organisation: req.user.organisation?._id,
    });
    res.json({ success: true, message: messages.SUCCESS });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.toggleBranch = async (req, res) => {
  const { id } = req.params;
  try {
    let branch = await branchModel.findOne({
      _id: id,
      organisation: req.user.organisation?._id,
    });
    branch.isActive = !branch.isActive;
    await branch.save();
    res.json({ success: true, message: messages.SUCCESS, data: branch });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getBranch = async (req, res) => {
  try {
    let branch = await branchModel.find({
      organisation: req.user.organisation?._id,
    }).populate({ path: "image", select: "url" });
    res.json({ success: true, message: messages.SUCCESS, data: branch });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
exports.fetchBranches = async (req, res) => {
  const { org: organisation, country, region, city } = req.query;
  try {
    let search = getSearchObject({
      organisation,
      "location.country": country,
      "location.region": region,
      "location.city": city,
    });
    let searchObj = {};
    if (search?.length > 0) {
      searchObj = { $or: search };
    }

    let branch = await branchModel
      .find(searchObj)
      .populate({ path: "image", select: "url" })
      .populate({
        path: "organisation",
        select: ["logo", "contact", "localName", "website"],
        populate: {
          path: "logo",
          select: "url",
        },
      });
    res.json({ success: true, message: messages.SUCCESS, data: branch });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
