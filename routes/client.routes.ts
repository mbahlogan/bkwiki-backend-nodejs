import express from "express";
import * as atmController from "../controllers/atm.controller";
import * as clientController from "../controllers/client.controller";
import * as cardController from "../controllers/cards.controller";
import * as branchController from "../controllers/branch.controller";
import * as loansController from "../controllers/loans.controller";

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



export default router;
