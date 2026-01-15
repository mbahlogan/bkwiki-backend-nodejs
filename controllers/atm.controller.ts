import { getSearchObject } from "../helpers";
import messages from "../helpers/messages";
import atmsModel from "../models/atms.model";

export const createATM = async (req, res) => {
  const {
    name,
    description,
    country,
    region,
    city,
    address,
    longitude,
    latitude,
    image,
    services,
  } = req.body;
  try {
    let atm = await atmsModel.create({
      name,
      description,
      image,
      services,
      address,
      city,
      country,
      latitude,
      longitude,
      region,
      organisation: req.user.organisation?._id,
    });
    res.json({ success: true, message: messages.SUCCESS, data: atm });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
export const updateATM = async (req, res) => {
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
    image,
    services,
  } = req.body;
  try {
    await atmsModel.updateOne(
      { _id: id, organisation: req.user.organisation?._id },
      {
        name,
        description,
        image,
        address,
        city,
        country,
        latitude,
        longitude,
        region,
        services,
      }
    );
    res.json({ success: true, message: messages.SUCCESS });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const deleteATM = async (req, res) => {
  const { id } = req.params;
  try {
    await atmsModel.deleteOne({
      _id: id,
      organisation: req.user.organisation?._id,
    });
    res.json({ success: true, message: messages.SUCCESS });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const toggleATM = async (req, res) => {
  const { id } = req.params;
  try {
    let atm = await atmsModel.findOne({
      _id: id,
      organisation: req.user.organisation?._id,
    });
    (atm as any).isActive = !(atm as any).isActive;
    await (atm as any).save();
    res.json({ success: true, message: messages.SUCCESS, data: atm });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const getATMs = async (req, res) => {
  try {
    let atms = await atmsModel
      .find({ organisation: req.user.organisation?._id })
      .populate({path: "image", select: "url"})
      .populate({
        path: "organisation",
        select: ["logo", "contact", "localName", "website"],
        populate: {
          path: "logo",
          select: "url"
        },
      });
    res.json({ success: true, message: messages.SUCCESS, data: atms });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const fetchATMs = async (req, res) => {
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

    let atms = await atmsModel.find(searchObj)      .populate({path: "image", select: "url"})
    .populate({
      path: "organisation",
      select: ["logo", "contact", "localName", "website"],
      populate: {
        path: "logo",
        select: "url"
      },
    });
    res.json({ success: true, message: messages.SUCCESS, data: atms });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
