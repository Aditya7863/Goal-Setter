import asyncHandler from 'express-async-handler'
// @desc Get all goals
// @route GET /api/goals
export const getGoals = asyncHandler(async (req, res) => {
    if (!res.body) {
        res.status(400).json('No goals set yet !');
    }
    return res.status(200).json({ message: res.body })
})
// @desc Set  goals
// @route POST /api/goals
export const setGoals = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "SET" });
})
// @desc Update goals
// @route PATCH /api/goals/:id
export const updateGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "UPDATE" });
})
// @desc Delete goals
// @route DELETE /api/goals/:id
export const deleteGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "DELETE" });
})

