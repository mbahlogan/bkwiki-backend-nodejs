import Joi from "joi";

const register = Joi.object({
  fname: Joi.string().max(50).required(),
  lname: Joi.string().max(50).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  pwd: Joi.string().required(),
  org: Joi.string(),
});

const login = Joi.object({
  email: Joi.string().email().required(),
  pwd: Joi.string().required(),
});
const resetPassword = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().required(),
});
const sendResetEmail = Joi.object({
  email: Joi.string().email().required(),
});
const createOrganization = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  localName: Joi.string().required(),
  mainShareholder: Joi.string().required(),
  percentShareholder: Joi.number().required(),
  namePCA: Joi.string().required(),
  nameDG: Joi.string().required(),
  headquarter: Joi.string().required(),
  branchCount: Joi.number().required(),
  atmCount: Joi.number().required(),
  customerCount: Joi.number().required(),
  email: Joi.string().email().required(),
  userEmail: Joi.string().email().required(),
  postal: Joi.string(),
  website: Joi.string(),
  type: Joi.string().required(),
  logo: Joi.string().required(),
  coverImage: Joi.string().required(),
  mobileBanking: Joi.array(),
  contact: Joi.array(),
});


const createProfile = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required()
});

const createOrgType = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required()
});

const addUsersToProfile = Joi.object({
  users: Joi.array().required(),
});
const addActionsToProfile = Joi.object({
  actions: Joi.array().required(),
});
const createATM = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  country: Joi.string().required(),
  region: Joi.string().required(),
  city: Joi.string().required(),
  address: Joi.string().required(),
  longitude: Joi.string().required(),
  latitude: Joi.string().required(),
  image: Joi.string(),
  services: Joi.array(),
});
const createBranch = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  manager: Joi.string(),
  country: Joi.string().required(),
  region: Joi.string().required(),
  city: Joi.string().required(),
  address: Joi.string().required(),
  longitude: Joi.string().required(),
  latitude: Joi.string().required(),
  openTime: Joi.string().required(),
  closeTime: Joi.string().required(),
  image: Joi.string(),
  services: Joi.array(),
  contact: Joi.array(),
});
const createCard = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  image: Joi.string(),
  network: Joi.string(),
  applyLink: Joi.string(),
  features: Joi.array(),
  requirements: Joi.array(),
  additionalFeatures: Joi.array(),
  eligeble: Joi.array(),
  stepsToApply: Joi.array(),
  services: Joi.array(),
  fees: Joi.array(),
  dailyLimit: Joi.string(),
  weeklyLimit: Joi.string(),
  monthlyLimit: Joi.string()
});
const createLoans = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  minAmount: Joi.string(),
  maxAmount: Joi.string(),

  applyLink: Joi.string(),
  features: Joi.array(),
  requirements: Joi.array(),
  eligeble: Joi.array(),
  stepsToApply: Joi.array(),
  fee: Joi.array(),
  interestRate: Joi.string(),
  image: Joi.string(),
});
const updateUser = Joi.object({
  fname: Joi.string().required(),
  lname: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
});
const createUser = Joi.object({
  fname: Joi.string().required(),
  lname: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
  profile: Joi.string().required(),
});





const adminValidations = {
  register,
  login,
  sendResetEmail,
  resetPassword,
  createOrganization,
  createProfile,
  addUsersToProfile,
  addActionsToProfile,
  createATM,
  createBranch,
  createCard,
  createLoans,
  updateUser,
  createUser,
  createOrgType
};
export default adminValidations;
