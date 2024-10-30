const messages = require("../helpers/messages");
const actionModel = require("../models/action.model");
const organisationModel = require("../models/organisation.model");
const organisationtypeModel = require("../models/organisationtype.model");
const profileModel = require("../models/profile.model");
const userModel = require("../models/user.model");

exports.getOrganization = async (_, res) => {
  try {
    let org = await organisationModel
      .find()
      .populate({ path: "logo", select: "url" })
      .populate({ path: "coverImage", select: "url" });
    res.json({ success: true, message: messages.SUCCESS, data: org });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
exports.fetchOrg = async (_, res) => {
  try {
    let org = await organisationModel
      .find()
      .ne("category", process.env.ADMIN_CATEGORY)
      .populate({ path: "logo", select: "url" })
      .populate({ path: "coverImage", select: "url" });
    res.json({ success: true, message: messages.SUCCESS, data: org });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
exports.getMyOrg = async (req, res) => {
  try {
    let org = await organisationModel
      .findById(req.user.organisation?._id)
      .populate({ path: "logo", select: "url" })
      .populate({ path: "coverImage", select: "url" });
    res.json({ success: true, message: messages.SUCCESS, data: org });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createOrganization = async (req, res) => {
  const {
    name,
    description,
    localName,
    mainShareholder,
    percentShareholder,
    namePCA,
    nameDG,
    headquarter,
    branchCount,
    atmCount,
    customerCount,
    email,
    userEmail,
    postal,
    website,
    type,
    logo,
    mobileBanking,
    contact,
    coverImage,
  } = req.body;
  try {
    let org = await organisationModel.create({
      name,
      description,
      localName,
      mainShareholder,
      percentShareholder,
      namePCA,
      nameDG,
      headquarter,
      branchCount,
      atmCount,
      customerCount,
      email,
      userEmail,
      postal,
      website,
      type,
      logo,
      mobileBanking,
      contact,
      coverImage,
    });
    const actions = await actionModel.find();
    profile = await profileModel.create({
      name: process.env.ADMIN_CATEGORY,
      description: process.env.ADMIN_CATEGORY,
      organisation: org._id,
      actions: actions.map((a) => a.value),
    });

    const pwd = process.env.ORG_PASS;
    await userModel.create({
      email: userEmail,
      profile: profile._id,
      pwd,
      organisation: org._id,
    });
    res.json({
      success: true,
      message: messages.SUCCESS,
      data: org,
      user: { email, password: pwd },
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: error.code ?? error.message });
  }
};

exports.updateOrganization = async (req, res) => {
  const {
    name,
    description,
    localName,
    mainShareholder,
    percentShareholder,
    namePCA,
    nameDG,
    headquarter,
    branchCount,
    atmCount,
    customerCount,
    email,
    postal,
    website,
    type,
    logo,
    mobileBanking,
    contact,
    coverImage,
  } = req.body;
  try {
    let org = await organisationModel.findOneAndUpdate(
      { _id: req.user.organisation._id },
      {
        name,
        description,
        localName,
        mainShareholder,
        percentShareholder,
        namePCA,
        nameDG,
        headquarter,
        branchCount,
        atmCount,
        customerCount,
        email,
        postal,
        website,
        type,
        logo,
        mobileBanking,
        contact,
        coverImage,
      }
    );

    // org.name = name;
    // org.description = description;
    // org.logo = logo;
    // org.mobileBanking = mobileBanking;
    // org.mainShareholder = mainShareholder;
    // org.localName = localName;
    // org.files = files;
    // org.files = files;
    // org.files = files;
    // org.files = files;
    // org.files = files;
    // org.files = files;

    // await org.save();
    res.json({ success: true, message: messages.SUCCESS, data: org });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
exports.updateMyOrganization = async (req, res) => {
  const {
    name,
    description,
    localName,
    mainShareholder,
    percentShareholder,
    namePCA,
    nameDG,
    headquarter,
    branchCount,
    atmCount,
    customerCount,
    email,
    postal,
    website,
    type,
    logo,
    mobileBanking,
    contact,
  } = req.body;
  try {
    let org = await organisationModel.findOneAndUpdate(
      { _id: req.user.organisation._id },
      {
        name,
        description,
        localName,
        mainShareholder,
        percentShareholder,
        namePCA,
        nameDG,
        headquarter,
        branchCount,
        atmCount,
        customerCount,
        email,
        postal,
        website,
        type,
        logo,
        mobileBanking,
        contact,
      }
    );
    res.json({ success: true, message: messages.SUCCESS, data: org });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.toggleOrganization = async (req, res) => {
  const { id } = req.params;
  try {
    let org = await organisationModel.findById(id);
    org.isActive = !org.isActive;
    await org.save();
    res.json({ success: true, message: messages.SUCCESS });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteOrganization = async (req, res) => {
  const { id } = req.params;
  try {
    await organisationModel.deleteOne({
      _id: id,
    });
    res.json({ success: true, message: messages.SUCCESS });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getOrgType = async (_, res) => {
  try {
    let types = await organisationtypeModel.find();
    res.json({ success: true, message: messages.SUCCESS, data: types });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createOrganizationType = async (req, res) => {
  const { name, description } = req.body;
  try {
    let type = await organisationtypeModel.create({
      name,
      description,
    });
    res.json({
      success: true,
      message: messages.SUCCESS,
      data: type,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: error.code ?? error.message });
  }
};

exports.updateOrganizationType = async (req, res) => {
  const { name, description } = req.body;
  const { id } = req.params;
  try {
    let org = await organisationtypeModel.findById(id);
    org.name = name;
    org.description = description;
    await org.save();

    res.json({ success: true, message: messages.SUCCESS, data: type });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.toggleOrganizationType = async (req, res) => {
  const { id } = req.params;
  try {
    let type = await organisationtypeModel.findById(id);
    type.isActive = !type.isActive;
    await type.save();
    res.json({ success: true, message: messages.SUCCESS });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteOrganizationType = async (req, res) => {
  const { id } = req.params;
  try {
    await organisationtypeModel.deleteOne({
      _id: id,
    });
    res.json({ success: true, message: messages.SUCCESS });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
