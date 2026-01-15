import cardsModel from "../models/cards.model";
import messages from "../helpers/messages";
import { getSearchObject } from "../helpers";

export const createCard = async (req, res) => {
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
    } as any);
    res.json({ success: true, message: messages.SUCCESS, data: card });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const updateCard = async (req, res) => {
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
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const deleteCard = async (req, res) => {
  const { id } = req.params;
  try {
    await cardsModel.deleteOne({
      _id: id,
      organisation: req.user.organisation?._id,
    });
    res.json({ success: true, message: messages.SUCCESS });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const toggleCard = async (req, res) => {
  const { id } = req.params;
  try {
    let card = await cardsModel.findOne({
      _id: id,
      organisation: req.user.organisation?._id,
    });
    (card as any).isActive = !(card as any).isActive;
    await (card as any).save();
    res.json({ success: true, message: messages.SUCCESS, data: card });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const getCards = async (req, res) => {
  try {
    let card = await cardsModel
      .find({
        organisation: req.user.organisation?._id,
      })
      .populate({ path: "image", select: "url" })
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
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
export const fetchCards = async (req, res) => {
  const { org: organisation } = req.query;

  try {
    let search = getSearchObject({ organisation });
    let searchObj = {};
    if (search?.length > 0) {
      searchObj = { $or: search };
    }

    let card = await cardsModel
      .find(searchObj)
      .populate({ path: "image", select: "url" })
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
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
export const fetchCard = async (req, res) => {
  const { id } = req.params;
  try {
    let card = await cardsModel.findById(id).populate({ path: "image", select: "url" }).populate({ path: "organisation", select: ["name", "logo"] })
    res.json({ success: true, message: messages.SUCCESS, data: card });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
