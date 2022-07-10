const express = require("express");
const router = express.Router();
const {
  getGoal,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController.js");
const { protect } = require("../middleware/authMiddleware.js");

//GET goal and set goal same route
router.route("/").get(protect, getGoal).post(protect, setGoal);
//UPDATE goal and delete goal by id same route
router.route("/:id").put(protect, updateGoal).delete(protect, deleteGoal);

module.exports = router;
