const path = require("path");
const { uploadPath } = require("../path");
const fs = require("fs");

exports.getFileUrl = (id) => {
  return `${process.env.BACKEND_URL}/api/admin/files/${id}`;
};

exports.getFilePath = (fileName, directory) => {
  return path.join(uploadPath, "/", directory, "/", fileName);
};
exports.getDirectory = (directory) => {
  return path.join(uploadPath, "/", directory);
};

exports.isDirectoryEmpty = (directory) => {
  return fs.promises.readdir(directory);
};

exports.getSearchObject = (obj = {}) => {
  let res = [];
  Object.entries(obj).forEach(([key, value]) => {
    if (value) {
      if (key === "organisation") {
        res = [...res, { [key]: value }];
      } else {
        res = [...res, { [key]: new RegExp(value, "i") }];
      }
    }
  });

  return res;
};

exports.deleteFile = (path) => {
  fs.rm(path, { recursive: true, force: true }, (err) => {
    if (err) {
      return Promise.reject(err);
    }
    return Promise.resolve();
  });
};
