const fs = require("fs");
const multer = require("multer");
const uuid = require("uuid");
const path = require("path");
const { uploadPath } = require("../path");

const storage = multer.diskStorage({
  destination: (_, file, cb) => {
    try {
      let directory = uuid.v4();
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath);
      }
      const uploadDestination = path.join(uploadPath, "/", directory);
      if (!fs.existsSync(uploadDestination)) {
        fs.mkdirSync(uploadDestination);
      }
      file.directory = directory;
      cb(null, uploadDestination);
    } catch (error) {
      cb(error, null);
    }
  },
  filename:  (_, file, cb) => {
    let name = file.originalname;
    cb(false, name);
  },
}); 

const upload = multer({ storage: storage })

module.exports = upload;
