const { uploadFiles, uploadFile } = require("../cloudinary");
const { getFilePath, getDirectory, isDirectoryEmpty } = require("../helpers");
const messages = require("../helpers/messages");
const File = require("../models/file.model");
const fs = require("fs");

exports.uploadFiles = async (req, res) => {
  try {
    let uploadedFiles = await uploadFiles(req.files);
    let files = uploadedFiles.map((file) => {
      return File.create({
        name: file.original_filename,
        fileId: file.asset_id,
        mimetype: `${file.resource_type}/${file.format}`,
        url: file.url,
      });
    });
    files = await Promise.all(files);
    res.status(201).json({
      message: "File uploaded",
      data: files?.map((file) => ({ url: file.url, _id: file._id })),
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occured", error, success: false });
  }
};

exports.uploadFile = async (req, res) => {
  try {
    let uploadedFile = await uploadFile(req.file);

    let file = await File.create({
      name: uploadedFile.original_filename,
      fileId: uploadedFile.asset_id,
      mimetype: `${uploadedFile.resource_type}/${uploadedFile.format}`,
      url: uploadedFile.url,
    });

    res.status(201).json({
      message: "File uploaded",
      data: { url: file.url, _id: file._id },
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occured", error, success: false });
  }
};

exports.getFile = async (req, res) => {
  try {
    let { fileId } = req.params;
    let file = await File.findById(fileId);
    let filePath = getFilePath(file.name, file.directory);
    res.sendFile(filePath);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "An error occured" });
  }
};
exports.getFiles = async (_, res) => {
  try {
    let files = await File.find();
    res.json({ data: files, message: messages.SUCCESS, success: true });
  } catch (error) {
    res.status(404).json({ message: "An error occured", success: false });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    let { fileId } = req.params;
    let file = await File.findById(fileId);
    let fileDirectory = getDirectory(file.directory);
    let filePath = getFilePath(file.name, file.directory);
    fs.unlinkSync(filePath);
    let directoryEmpty = await isDirectoryEmpty(fileDirectory);
    if (!directoryEmpty.length) {
      fs.rmdirSync(fileDirectory);
    }
    await File.findByIdAndDelete(file.id);
    res.status(200).json({ message: "File deleted", success: true });
  } catch (error) {
    res.status(404).json({ message: "An error occured", success: false });
  }
};
