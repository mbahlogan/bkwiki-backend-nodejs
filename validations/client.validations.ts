import Joi from "joi";

const register = Joi.object({
  fname: Joi.string().max(50).required(),
  lname: Joi.string().max(50).required(),
  email: Joi.string().email().required(),
  pwd: Joi.string().required(),
  phone: Joi.string().required()
});
const verify = Joi.object({
  otp: Joi.number().min(6).required()
});
const update = Joi.object({
  fullName: Joi.string().max(100).required(),
  emailAddress: Joi.string().email().required(),
  country: Joi.string().required(),
  phoneNumber: Joi.string().required(),
});

const password = Joi.object({
  oldPassword: Joi.string().required(), 
  newPassword: Joi.string().required()
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
  emailAddress: Joi.string().email().required(),
});


const clientValidations = {
  register,
  update,
  login,
  sendResetEmail,
  resetPassword,
  password,
  verify
};
export default clientValidations;
