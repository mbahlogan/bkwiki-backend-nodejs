import { decryptRequestPayload } from "../utils/encryptions";
const decryptPayload = (req, res, next) => {
  const { payload: encryptedPayload, ...rest } = req.body;

  const unwantedKey = Object.keys(rest);
  if (unwantedKey.length > 0) {
    return res.json({
      success: false,
      message: "Unkown field",
      fields: unwantedKey,
    });
  }

  try {
    const payload = decryptRequestPayload(encryptedPayload);
    if (!payload) {
      throw new Error("Invalid payload");
    } else {
      req.body = payload.data;
      next();
    }
  } catch (error) {
    return res.json({
      success: false,
      message: "Invalid payload",
      payload: encryptedPayload,
      error,
    });
  }
};
export default decryptPayload;
