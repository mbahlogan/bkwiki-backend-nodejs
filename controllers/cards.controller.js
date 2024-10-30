const cardsModel = require("../models/cards.model");
const messages = require("../helpers/messages");
const { getSearchObject } = require("../helpers");

exports.createCard = async (req, res) => {
  const {
    name,
    description,
    features,
    requirements,
    additionalFeatures,
    eligeble,
    stepsToApply,
    fees,
    dailyLimit,
    weeklyLimit,
    monthlyLimit,
    applyLink,
    services,
    image,
  } = req.body;
  try {
    let card = await cardsModel.create({
      name,
      description,
      features,
      fees,
      requirements,
      additionalFeatures,
      stepsToApply,
      eligeble,
      dailyLimit,
      weeklyLimit,
      monthlyLimit,
      applyLink,
      services,
      image,
      organisation: req.user.organisation?._id,
    });
    res.json({ success: true, message: messages.SUCCESS, data: card });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateCard = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    features,
    fees,
    requirements,
    additionalFeatures,
    stepsToApply,
    eligeble,
    dailyLimit,
    weeklyLimit,
    monthlyLimit,
    applyLink,
    services,
    image,
  } = req.body;
  try {
    await cardsModel.updateOne(
      { _id: id, organisation: req.user.organisation?._id },
      {
        name,
        description,
        features,
        fees,
        requirements,
        additionalFeatures,
        stepsToApply,
        eligeble,
        dailyLimit,
        weeklyLimit,
        monthlyLimit,
        applyLink,
        services,
        image,
      }
    );
    res.json({ success: true, message: messages.SUCCESS });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteCard = async (req, res) => {
  const { id } = req.params;
  try {
    await cardsModel.deleteOne({
      _id: id,
      organisation: req.user.organisation?._id,
    });
    res.json({ success: true, message: messages.SUCCESS });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.toggleCard = async (req, res) => {
  const { id } = req.params;
  try {
    let card = await cardsModel.findOne({
      _id: id,
      organisation: req.user.organisation?._id,
    });
    card.isActive = !card.isActive;
    await card.save();
    res.json({ success: true, message: messages.SUCCESS, data: card });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCards = async (req, res) => {
  try {
    let card = await cardsModel
      .find({
        organisation: req.user.organisation?._id,
      })
      .populate({path: "image", select: "url"})
      .populate({
        path: "organisation",
        select: ["logo", "contact", "localName", "website"],
        populate: {
          path: "logo",
          select: "url"
        },
      });
    res.json({ success: true, message: messages.SUCCESS, data: card });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
exports.fetchCards = async (req, res) => {
  const { org: organisation } = req.query;

  try {
    let search = getSearchObject({ organisation });
    let searchObj = {};
    if (search?.length > 0) {
      searchObj = { $or: search };
    }

    let card = await cardsModel
      .find(searchObj)
      .populate({path: "image", select: "url"})
      .populate({
        path: "organisation",
        select: ["logo", "contact", "localName", "website"],
        populate: {
          path: "logo",
          select: "url"
        },
      });
    res.json({ success: true, message: messages.SUCCESS, data: card });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
exports.fetchCard = async (req, res) => {
  const { id } = req.params;
  try {
    let card = await cardsModel.findById(id).populate({path: "image", select: "url"}).populate({path: "organisation", select: ["name", "logo"]})
    res.json({ success: true, message: messages.SUCCESS, data: card });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
