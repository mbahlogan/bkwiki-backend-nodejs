const express = require("express");
const filesController = require("../controllers/file.controller");
const upload = require("../helpers/upload");
const router = express.Router();


router.post("/", upload.array("files", 5), filesController.uploadFiles);
router.put("/", upload.single("file"), filesController.uploadFile);
router.get("/", filesController.getFiles);
router.get("/:fileId", filesController.getFile);
router.delete("/:fileId", filesController.deleteFile);

module.exports = router;
