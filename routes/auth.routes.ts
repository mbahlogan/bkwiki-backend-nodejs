import express from "express";
const router = express.Router();
import * as authController from "../controllers/auth.controller";
import validationMiddleware from "../middleware/validation";
import clientValidations from "../validations/client.validations";
import adminValidations from "../validations/admin.validations";

router.post("/client/register", validationMiddleware(clientValidations.register), authController.signupClient);
router.post("/client/login", validationMiddleware(clientValidations.login), authController.loginClient);
router.put("/client/verify/:id", validationMiddleware(clientValidations.verify), authController.verifyAccount);


router.post("/admin/register", validationMiddleware(adminValidations.register), authController.signupAdmin);
router.post("/admin/login", validationMiddleware(adminValidations.login), authController.loginAdmin);

export default router;