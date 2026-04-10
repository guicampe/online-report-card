const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { getMyGrades } = require("../controllers/gradesController");
const { getMySubjects } = require("../controllers/subjectsController");
const { authenticate } = require("../middlewares/authMiddleware");
const { validateUpdate } = require("../middlewares/validateMiddleware");
const { authorizeOwner } = require("../middlewares/authorizeOwner");


router.get("/grades", authenticate, getMyGrades);
router.get("/subjects", authenticate, getMySubjects);
router.get("/:id", authenticate, userController.getUserById);

router.put("/:id", authenticate, authorizeOwner, validateUpdate, userController.updateUser);


module.exports = router;