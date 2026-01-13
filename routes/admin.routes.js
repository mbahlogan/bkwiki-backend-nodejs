const express = require("express");
const adminController = require("../controllers/admin.controller");
const orgController = require("../controllers/organisation.controller");
const profileController = require("../controllers/profile.controller");
const atmController = require("../controllers/atm.controller");
const cardController = require("../controllers/cards.controller");
const branchController = require("../controllers/branch.controller");
const loansController = require("../controllers/loans.controller");
const validationMiddleware = require("../middleware/validation");
const adminValidations = require("../validations/admin.validations");
const { allowAdmin, allowClient } = require("../middleware/auth");
const router = express.Router();



router.post("/config", adminController.addConfig)
router.get("/config", adminController.getConfig)
router.get("/config/:id", adminController.getConfigById)

// Organization
router.get("/orgs", allowAdmin, orgController.getOrganization);
router.post("/orgs",  [allowAdmin, validationMiddleware(adminValidations.createOrganization)], orgController.createOrganization);
// router.put("/orgs", validationMiddleware(adminValidations.createOrganization), orgController.updateOrganization);
router.patch("/orgs/:id", allowAdmin, orgController.toggleOrganization);
router.delete("/orgs/:id", allowAdmin, orgController.deleteOrganization);
router.get("/orgs/me", orgController.getMyOrg);
router.put("/orgs/me", orgController.updateMyOrganization);

// Organization
router.get("/orgs/type", allowAdmin, orgController.getOrgType);
router.post("/orgs/type",  [allowAdmin, validationMiddleware(adminValidations.createOrgType)], orgController.createOrganizationType);
router.patch("/orgs/type/:id", allowAdmin, orgController.toggleOrganizationType);
router.delete("/orgs/type/:id", allowAdmin, orgController.deleteOrganizationType);

// Profiles
router.get("/profiles", profileController.getProfile);
router.post("/profiles", validationMiddleware(adminValidations.createProfile), profileController.createProfile);
router.put("/profiles/:id", validationMiddleware(adminValidations.createProfile), profileController.updateProfile);
router.patch("/profiles/:id", profileController.toggleProfile);
router.delete("/profiles/:id", profileController.deleteProfile);
router.get("/profiles/:id/users", profileController.getUsersByProfile);
router.post("/profiles/:id/users", validationMiddleware(adminValidations.addUsersToProfile), profileController.addUsersToProfile);
router.post("/profiles/:id/actions", validationMiddleware(adminValidations.addActionsToProfile), profileController.addActionsToProfile);
router.get("/profiles/:id/actions", profileController.getActionsByProfile);
router.get("/actions", profileController.getActions);
// ATMs
router.get("/atms", allowAdmin, atmController.getATMs);
router.post("/atms",  [allowAdmin, validationMiddleware(adminValidations.createATM)], atmController.createATM);
router.put("/atms/:id",  [allowAdmin, validationMiddleware(adminValidations.createATM)], atmController.updateATM);
router.patch("/atms/:id",  allowAdmin, atmController.toggleATM);
router.delete("/atms/:id",  allowAdmin, atmController.deleteATM);

// Branches
router.get("/branch",  allowAdmin, branchController.getBranch);
router.post("/branch",  [allowAdmin, validationMiddleware(adminValidations.createBranch)], branchController.createBranch);
router.put("/branch/:id",  [allowAdmin, validationMiddleware(adminValidations.createBranch)], branchController.updateBranch);
router.patch("/branch/:id",  allowAdmin, branchController.toggleBranch);
router.delete("/branch/:id",  allowAdmin, branchController.deleteBranch);

// Loans
router.get("/loans",  allowAdmin, loansController.getLoans);
router.post("/loans",  [allowAdmin, validationMiddleware(adminValidations.createLoans)], loansController.createLoan);
router.put("/loans/:id",  [allowAdmin, validationMiddleware(adminValidations.createLoans)], loansController.updateLoan);
router.patch("/loans/:id",  allowAdmin, loansController.toggleLoan);
router.delete("/loans/:id",  allowAdmin, loansController.deleteLoan);

// Cards
router.get("/cards",  allowAdmin, cardController.getCards);
router.post("/cards",  [allowAdmin, validationMiddleware(adminValidations.createCard)], cardController.createCard);
router.put("/cards/:id",  [allowAdmin, validationMiddleware(adminValidations.createCard)], cardController.updateCard);
router.patch("/cards/:id",  allowAdmin, cardController.toggleCard);
router.delete("/cards/:id",  allowAdmin, cardController.deleteCard);

router.get("/users", adminController.getUsers);
router.get("/users/me", adminController.getAuthUser);
router.put("/users", validationMiddleware(adminValidations.updateUser), adminController.updateUser);
router.post("/users", validationMiddleware(adminValidations.createUser), adminController.addUser);
router.put("/users/:id/disactivate", adminController.disactivateUser);
router.delete("/users/:id", adminController.deleteUser);

// router.get("/users/reset/:id", adminController.resetUser);




module.exports = router;