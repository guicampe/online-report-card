const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const gradesController = require("../controllers/gradesController");
const subjectsController = require("../controllers/subjectsController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");

router.get("/grades", authenticate, authorize("admin"), gradesController.getAllGrades);
router.get("/grades/:userId", authenticate, authorize("admin"), gradesController.getGradesById);
router.patch("/grades/:userId/:subjectId",  authenticate, authorize("admin"), gradesController.updateGrades);
router.delete("/grades/:userId/:subjectId", authenticate, authorize("admin"), gradesController.deleteGrades);

router.get("/subjects", authenticate, authorize("admin"), subjectsController.getAllSubjects);
router.post("/subjects", authenticate, authorize("admin"), subjectsController.createSubject);
router.put("/subjects/:id", authenticate, authorize("admin"), subjectsController.updateSubject);
router.delete("/subjects/:id", authenticate, authorize("admin"), subjectsController.deleteSubject);

router.get("/users", authenticate, authorize("admin"), userController.getAllUsers);
router.get("/users/:id", authenticate, authorize("admin"), userController.getUserById);



module.exports = router;