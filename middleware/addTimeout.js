const { decryptData } = require("../utils/encryptions");
const moment = require("moment");

function addTimeout(req, res, next) {
  const reqTime = req.headers["x-time"];
  try {
    const time = decryptData(reqTime);
    let date = new Date(parseInt(time));
    if (moment(date).add(5, "s").isBefore(new Date())) {
      return res
        .status(408)
        .json({ message: "Request timeout", success: false });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occured", success: false });
  }
}

module.exports = addTimeout;
