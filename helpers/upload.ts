import fs from "fs";
import multer from "multer";
import { v4 as uuidv4 } from 'uuid';
import path from "path";
import { uploadPath } from "../path";

const storage = multer.diskStorage({
  destination: (_, file, cb) => {
    try {
      let directory = uuidv4();
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath);
      }
      const uploadDestination = path.join(uploadPath, "/", directory);
      if (!fs.existsSync(uploadDestination)) {
        fs.mkdirSync(uploadDestination);
      }
      (file as any).directory = directory;
      cb(null, uploadDestination);
    } catch (error) {
      cb(error as Error, "");
    }
  },
  filename: (_, file, cb) => {
    let name = file.originalname;
    cb(null, name);
  },
});

const upload = multer({ storage: storage })

export default upload;
