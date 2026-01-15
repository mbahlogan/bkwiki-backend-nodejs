import { v2 as cloudinary } from "cloudinary";
import { deleteFile } from "../helpers";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadFile = async ({ path, destination }: { path: string, destination: string }) => {

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

export const uploadFiles = async (files: any[] = []) => {
  let upload = files.map(file => {
    return uploadFile(file)
  })

  return Promise.all(upload)
};

