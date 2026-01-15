import errors from "../helpers/errors";

export const allowAdmin = (req, res, next) => {
  if (req.user.organisation?.category !== process.env.ADMIN_CATEGORY) {
    return res.status(403).json({ message: "This content is restricted", code: errors.RESTRICTED, success: false });
  } else {
    next();
  }
};
export const allowClient = (req, res, next) => {
  if (req.user.organisation?.category !== process.env.CLIENT_CATEGORY) {
    return res.status(403).json({ message: "This content is restricted", code: errors.RESTRICTED, success: false });
  } else {
    next();
  }
};
