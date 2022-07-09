const express = require("express");
const router = express.Router();
const {
  getGoal,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController.js");

//GET goal and set goal same route
router.route('/').get(getGoal).post(setGoal);
//UPDATE goal and delete goal by id same route
router.route('/:id').put(updateGoal).delete(deleteGoal);


module.exports = router;
