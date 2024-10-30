const express = require("express");
const atmController = require("../controllers/atm.controller");
const clientController = require("../controllers/client.controller");
const cardController = require("../controllers/cards.controller");
const branchController = require("../controllers/branch.controller");
const loansController = require("../controllers/loans.controller");

const router = express.Router();



router.get("/orgs", clientController.fetchOrgs);
router.get("/orgs/:id", clientController.getOrgById);

// ATMs
router.get("/atms", atmController.fetchATMs);

// Branches
router.get("/branch", branchController.fetchBranches);

// Loans
router.get("/loans", loansController.fetchLoans);
router.get("/loans/:id", loansController.fetchLoan);

// Cards
router.get("/cards", cardController.fetchCards)
router.get("/cards/:id", cardController.fetchCard)



module.exports = router;
