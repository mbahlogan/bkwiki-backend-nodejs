const actionModel = require("../models/action.model");
const organisationModel = require("../models/organisation.model");
const userModel = require("../models/user.model");
const actions = require("../constant/actions.json");
const profileModel = require("../models/profile.model");

module.exports.prepareApp = async () => {
  console.log("==========> Preparing App");
  try {
    const user = await userModel.findOne();
    let org = await organisationModel.findOne()
    if (!user && !org) {
      console.log("==========> Creating Organization");
        org = await organisationModel.create({
        name: process.env.ADMIN_ORG_NAME,
        category: process.env.ADMIN_CATEGORY,
      });
      console.log("==========> Creating Actions");
      const actns = await actionModel.insertMany(actions);
      console.log("==========> Creating profile");
      await profileModel.create({
        name: process.env.ADMIN_CATEGORY,
        description: process.env.ADMIN_ORG_NAME,
        organisation: org._id,
        actions: actns.filter(a => !a.category).map(a => a.value),
      });
      console.log("==========> Prepare complete ");
      return Promise.resolve()
    } else {
      console.log("==========> Prepare complete ");
      return Promise.resolve()
    }

  } catch (error) {
    return  Promise.reject(error)
  }
};
