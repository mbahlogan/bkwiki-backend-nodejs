const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const validationMiddleware = require("../middleware/validation");
const clientValidations = require("../validations/client.validations");
const adminValidations = require("../validations/admin.validations");

router.post("/client/register", validationMiddleware(clientValidations.register), authController.signupClient);
router.post("/client/login", validationMiddleware(clientValidations.login), authController.loginClient);
router.put("/client/verify/:id", validationMiddleware(clientValidations.verify), authController.verifyAccount);


router.post("/admin/register", validationMiddleware(adminValidations.register), authController.signupAdmin);
router.post("/admin/login", validationMiddleware(adminValidations.login), authController.loginAdmin);

module.exports = router;