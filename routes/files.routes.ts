import express from "express";
import * as filesController from "../controllers/file.controller";
import upload from "../helpers/upload";
const router = express.Router();


router.post("/", upload.array("files", 5), filesController.uploadFiles);
router.put("/", upload.single("file"), filesController.uploadFile);
router.get("/", filesController.getFiles);
router.get("/:fileId", filesController.getFile);
router.delete("/:fileId", filesController.deleteFile);

export default router;
