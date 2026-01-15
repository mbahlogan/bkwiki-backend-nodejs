import messages from "../helpers/messages";
import actionModel from "../models/action.model";
import organisationModel from "../models/organisation.model";
import organisationtypeModel from "../models/organisationtype.model";
import profileModel from "../models/profile.model";
import userModel from "../models/user.model";

export const getOrganization = async (_, res) => {
  try {
    let org = await organisationModel
      .find()
      .populate({ path: "logo", select: "url" })
      .populate({ path: "coverImage", select: "url" });
    res.json({ success: true, message: messages.SUCCESS, data: org });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
export const fetchOrg = async (_, res) => {
  try {
    let org = await organisationModel
      .find()
      .ne("category", process.env.ADMIN_CATEGORY)
      .populate({ path: "logo", select: "url" })
      .populate({ path: "coverImage", select: "url" });
    res.json({ success: true, message: messages.SUCCESS, data: org });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
export const getMyOrg = async (req, res) => {
  try {
    let org = await organisationModel
      .findById(req.user.organisation?._id)
      .populate({ path: "logo", select: "url" })
      .populate({ path: "coverImage", select: "url" });
    res.json({ success: true, message: messages.SUCCESS, data: org });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const createOrganization = async (req, res) => {
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
    } as any);
    const actions = await actionModel.find();
    let profile = await profileModel.create({
      name: process.env.ADMIN_CATEGORY,
      description: process.env.ADMIN_CATEGORY,
      organisation: (org as any)._id,
      actions: actions.map((a) => a.value),
    });

    const pwd = process.env.ORG_PASS;
    await userModel.create({
      email: userEmail,
      profile: profile._id,
      pwd,
      organisation: (org as any)._id,
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
      .json({ success: false, message: (error as any).code ?? (error as Error).message });
  }
};

export const updateOrganization = async (req, res) => {
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

    // (org as any).name = name;
    // (org as any).description = description;
    // (org as any).logo = logo;
    // (org as any).mobileBanking = mobileBanking;
    // (org as any).mainShareholder = mainShareholder;
    // (org as any).localName = localName;
    // (org as any).files = files;
    // (org as any).files = files;
    // (org as any).files = files;
    // (org as any).files = files;
    // (org as any).files = files;
    // (org as any).files = files;

    // await (org as any).save();
    res.json({ success: true, message: messages.SUCCESS, data: org });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
export const updateMyOrganization = async (req, res) => {
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
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const toggleOrganization = async (req, res) => {
  const { id } = req.params;
  try {
    let org = await organisationModel.findById(id);
    (org as any).isActive = !(org as any).isActive;
    await (org as any).save();
    res.json({ success: true, message: messages.SUCCESS });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const deleteOrganization = async (req, res) => {
  const { id } = req.params;
  try {
    await organisationModel.deleteOne({
      _id: id,
    });
    res.json({ success: true, message: messages.SUCCESS });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const getOrgType = async (_, res) => {
  try {
    let types = await organisationtypeModel.find();
    res.json({ success: true, message: messages.SUCCESS, data: types });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const createOrganizationType = async (req, res) => {
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
      .json({ success: false, message: (error as any).code ?? (error as Error).message });
  }
};

export const updateOrganizationType = async (req, res) => {
  const { name, description } = req.body;
  const { id } = req.params;
  try {
    let org = await organisationtypeModel.findById(id);
    (org as any).name = name;
    (org as any).description = description;
    await (org as any).save();

    res.json({ success: true, message: messages.SUCCESS, data: org });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const toggleOrganizationType = async (req, res) => {
  const { id } = req.params;
  try {
    let type = await organisationtypeModel.findById(id);
    (type as any).isActive = !(type as any).isActive;
    await (type as any).save();
    res.json({ success: true, message: messages.SUCCESS });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const deleteOrganizationType = async (req, res) => {
  const { id } = req.params;
  try {
    await organisationtypeModel.deleteOne({
      _id: id,
    });
    res.json({ success: true, message: messages.SUCCESS });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
