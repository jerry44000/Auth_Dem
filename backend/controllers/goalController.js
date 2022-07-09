const asyncHandler = require('express-async-handler');

//Get goals
//route GET /api/goals
//Access private
const getGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "get goals bro" });
});

//Set goals
//route POST /api/goals
//Access private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('please send a text field bro !!!');
  }
  res.status(200).json({ message: "set goals bro" });
});

//Update goals
//route PUT /api/goals/:id
//Access private
const updateGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `update goal ${req.params.id}` });
});

//delete goals
//route DEL /api/goals/:id
//Access private
const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `delete goal ${req.params.id}` });
});

module.exports = {
  getGoal,
  setGoal,
  updateGoal,
  deleteGoal,
};
