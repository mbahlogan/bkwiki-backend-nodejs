const cloudinary = require("cloudinary").v2;
const { deleteFile } = require("../helpers");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadFile = async ({ path, destination }) => {

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(path, { folder: "bkwiki", access_mode: "public" })
      .then(async (result) => {
        await deleteFile(destination)
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

exports.uploadFiles = async (files = []) => {
  let upload = files.map(file => {
    return this.uploadFile(file)
  })

  return Promise.all(upload)
};

