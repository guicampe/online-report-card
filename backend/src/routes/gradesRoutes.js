const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const gradesController = require("../controllers/gradesController");

router.get("/", authenticate, authorize("admin"), gradesController.getAllGrades);
router.get("/me", authenticate, gradesController.getMyGrades);

router.patch("/:userId", authenticate, authorize("admin"), gradesController.updateGrades);

module.exports = router;