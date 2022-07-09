const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel.js");

//Get goals
//route GET /api/goals
//Access private
const getGoal = asyncHandler(async (req, res) => {
  const goals = await Goal.find();
  const message = "Your goals are here bro !!!";
  res.status(200).json({ message: message, goals });
});

//Set goals
//route POST /api/goals
//Access private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("please send a text field bro !!!");
  }
  const goal = await Goal.create({
    text: req.body.text,
  });
  const message = "Your goal has bee created successfully bro !!!";
  res.status(200).json({ message: message, goal });
});

//Update goals
//route PUT /api/goals/:id
//Access private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal couldn't be found bro.");
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  const message = "Goal have been updated bro";
  res.status(200).json({ message: message, updatedGoal });
});

//delete goals
//route DEL /api/goals/:id
//Access private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("The goal you are trying to delete doesn't exist bro !!!");
  }
  await goal.remove();
  const message = "Goal deleted successfully dude";
  res.status(200).json({ message: message, id: req.params.id });
});

module.exports = {
  getGoal,
  setGoal,
  updateGoal,
  deleteGoal,
};
