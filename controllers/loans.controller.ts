import loansModel from "../models/loans.model";
import messages from "../helpers/messages";
import { getSearchObject } from "../helpers";

export const createLoan = async (req, res) => {
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
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const updateLoan = async (req, res) => {
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
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const deleteLoan = async (req, res) => {
  const { id } = req.params;
  try {
    await loansModel.deleteOne({
      _id: id,
      organisation: req.user.organisation?._id,
    });
    res.json({ success: true, message: messages.SUCCESS });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const toggleLoan = async (req, res) => {
  const { id } = req.params;
  try {
    let loan = await loansModel.findOne({
      _id: id,
      organisation: req.user.organisation?._id,
    });
    (loan as any).isActive = !(loan as any).isActive;
    await (loan as any).save();
    res.json({ success: true, message: messages.SUCCESS, data: loan });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const getLoans = async (req, res) => {
  try {
    let loans = await loansModel
      .find({
        organisation: req.user.organisation?._id,
      })
      .populate("image");
    res.json({ success: true, message: messages.SUCCESS, data: loans });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const fetchLoans = async (req, res) => {
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
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
export const fetchLoan = async (req, res) => {
  const { id } = req.params;
  try {
    let loans = await loansModel
      .findById(id)
      .populate(["image", "organisation"]);
    res.json({ success: true, message: messages.SUCCESS, data: loans });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
