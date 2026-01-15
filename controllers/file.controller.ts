import { uploadFiles as cloudinaryUploadFiles, uploadFile as cloudinaryUploadFile } from "../cloudinary";
import { getFilePath, getDirectory, isDirectoryEmpty } from "../helpers";
import messages from "../helpers/messages";
import File from "../models/file.model";
import fs from "fs";

export const uploadFiles = async (req, res) => {
  try {
    let uploadedFiles = await cloudinaryUploadFiles(req.files as any);
    let filesPromises = uploadedFiles.map((file) => {
      return File.create({
        name: (file as any).original_filename,
        fileId: (file as any).asset_id,
        mimetype: `${(file as any).resource_type}/${(file as any).format}`,
        url: (file as any).url,
      });
    });

    let files = await Promise.all(filesPromises);
    res.json({ success: true, message: messages.SUCCESS, data: files });
    res.status(201).json({
      message: "File uploaded",
      data: files?.map((file) => ({ url: (file as any).url, _id: (file as any)._id })),
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occured", error, success: false });
  }
};

export const uploadFile = async (req, res) => {
  try {
    let uploadedFile = await cloudinaryUploadFile((req as any).file) as any;

    let file = await File.create({
      name: uploadedFile.original_filename,
      fileId: uploadedFile.asset_id,
      mimetype: `${uploadedFile.resource_type}/${uploadedFile.format}`,
      url: uploadedFile.url,
    });

    res.status(201).json({
      message: "File uploaded",
      data: { url: (file as any).url, _id: (file as any)._id },
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occured", error, success: false });
  }
};

export const getFile = async (req, res) => {
  try {
    let { fileId } = req.params;
    let file = await File.findById(fileId);
    let filePath = getFilePath((file as any).name, (file as any).directory);
    res.sendFile(filePath);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "An error occured" });
  }
};
export const getFiles = async (_, res) => {
  try {
    let files = await File.find();
    res.json({ data: files, message: messages.SUCCESS, success: true });
  } catch (error) {
    res.status(404).json({ message: "An error occured", success: false });
  }
};

export const deleteFile = async (req, res) => {
  try {
    let { fileId } = req.params;
    let file = await File.findById(fileId);
    let fileDirectory = getDirectory((file as any).directory);
    let filePath = getFilePath((file as any).name, (file as any).directory);
    fs.unlinkSync(filePath);
    let directoryEmpty = await isDirectoryEmpty(fileDirectory);
    if (!directoryEmpty.length) {
      fs.rmdirSync(fileDirectory);
    }
    await File.findByIdAndDelete((file as any).id);
    res.status(200).json({ message: "File deleted", success: true });
  } catch (error) {
    res.status(404).json({ message: "An error occured", success: false });
  }
};
