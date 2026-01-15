import path from "path";
import { uploadPath } from "../path";
import fs from "fs";

export const getFileUrl = (id) => {
  return `${process.env.BACKEND_URL}/api/admin/files/${id}`;
};

export const getFilePath = (fileName, directory) => {
  return path.join(uploadPath, "/", directory, "/", fileName);
};
export const getDirectory = (directory) => {
  return path.join(uploadPath, "/", directory);
};

export const isDirectoryEmpty = (directory) => {
  return fs.promises.readdir(directory);
};

export const getSearchObject = (obj = {}) => {
  let res: any[] = [];
  Object.entries(obj).forEach(([key, value]) => {
    if (value) {
      if (key === "organisation") {
        res = [...res, { [key]: value }];
      } else {
        res = [...res, { [key]: new RegExp(value as string, "i") }];
      }
    }
  });

  return res;
};

export const deleteFile = (path) => {
  fs.rm(path, { recursive: true, force: true }, (err) => {
    if (err) {
      return Promise.reject(err);
    }
    return Promise.resolve();
  });
};
