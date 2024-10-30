const loansModel = require("../models/loans.model");
const messages = require("../helpers/messages");
const { getSearchObject } = require("../helpers");

exports.createLoan = async (req, res) => {
  const {
    name,
    description,
    features,
    requirements,
    stepsToApply,
    minAmount,
    minDuration,
    maxDuration,
    maxAmount,
    eligeble,
    fee,
    interestRate,
    image,
    applyLink,
  } = req.body;
  try {
    let loan = await loansModel.create({
      name,
      description,
      features,
      requirements,
      stepsToApply,
      minDuration,
      maxDuration,
      minAmount,
      maxAmount,
      eligeble,
      fee,
      interestRate,
      applyLink,
      image,
      organisation: req.user.organisation?._id,
    });
    res.json({ success: true, message: messages.SUCCESS, data: loan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateLoan = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    features,
    requirements,
    stepsToApply,
    minAmount,
    maxAmount,
    eligeble,
    minDuration,
    maxDuration,
    fee,
    interestRate,
    image,
    applyLink,
  } = req.body;
  try {
    let loans = await loansModel.updateOne(
      { _id: id, organisation: req.user.organisation?._id },
      {
        name,
        description,
        features,
        requirements,
        stepsToApply,
        minDuration,
        maxDuration,
        minAmount,
        maxAmount,
        eligeble,
        fee,
        interestRate,
        image,
        applyLink,
      }
    );
    res.json({ success: true, message: messages.SUCCESS });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteLoan = async (req, res) => {
  const { id } = req.params;
  try {
    await loansModel.deleteOne({
      _id: id,
      organisation: req.user.organisation?._id,
    });
    res.json({ success: true, message: messages.SUCCESS });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.toggleLoan = async (req, res) => {
  const { id } = req.params;
  try {
    let loan = await loansModel.findOne({
      _id: id,
      organisation: req.user.organisation?._id,
    });
    loan.isActive = !loan.isActive;
    await loan.save();
    res.json({ success: true, message: messages.SUCCESS, data: loan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getLoans = async (req, res) => {
  try {
    let loans = await loansModel
      .find({
        organisation: req.user.organisation?._id,
      })
      .populate("image");
    res.json({ success: true, message: messages.SUCCESS, data: loans });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.fetchLoans = async (req, res) => {
  const { org: organisation } = req.query;

  try {
    let search = getSearchObject({ organisation });
    let searchObj = {};
    if (search?.length > 0) {
      searchObj = { $or: search };
    }

    let loans = await loansModel
      .find(searchObj)
      .populate({
        path: "image",
        select: "url"
      })
      .populate({
        path: "organisation",
        select: ["logo", "contact", "localName", "website"],
        populate: {
          path: "logo",
          select: "url"
        },
      });
    res.json({ success: true, message: messages.SUCCESS, data: loans });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
exports.fetchLoan = async (req, res) => {
  const { id } = req.params;
  try {
    let loans = await loansModel
      .findById(id)
      .populate(["image", "organisation"]);
    res.json({ success: true, message: messages.SUCCESS, data: loans });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
