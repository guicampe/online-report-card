const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const gradesController = require("../controllers/gradesController");

router.get("/", authenticate, authorize("admin"), gradesController.getAllGrades);
router.get("/me", authenticate, gradesController.getMyGrades);
router.get("/:userId", authenticate, authorize("admin"), gradesController.getGradesById);

router.patch("/:userId/:subjectId",  authenticate, authorize("admin"), gradesController.updateGrades);

router.delete("/:userId/:subjectId", authenticate, authorize("admin"), gradesController.deleteGrades);

module.exports = router;