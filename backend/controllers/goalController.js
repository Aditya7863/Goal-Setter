import asyncHandler from 'express-async-handler';
import Goal from '../models/goalModel.js';

// @desc Get all goals
// @route GET /api/goals
export const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find();
    return res.status(200).json(goals);
})
// @desc Set  goals
// @route POST /api/goals
export const setGoals = asyncHandler(async (req, res, next) => {
    if (!req.body.text) {
        const error = new Error(`Please add a text field`);
        error.status = 400;
        return next(error);
    }
    const goal = await Goal.create({
        text: req.body.text
    })
    res.status(200).json(goal);
})
// @desc Update goals
// @route PATCH /api/goals/:id
export const updateGoal = asyncHandler(async (req, res, next) => {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
        const error = new Error(`Goal not found`);
            error.status = 404;
            return next(error);
        }
        const updatedGoal = await Goal.findByIdAndUpdate(req.params.id,req.body,{
            new:true
        })
    res.status(200).json(updatedGoal);
})
// @desc Delete goals
// @route DELETE /api/goals/:id
export const deleteGoal = asyncHandler(async (req, res, next) => {
    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        const error = new Error(`Goal not found`);
            error.status = 404;
            return next(error);
        }
        await Goal.findByIdAndDelete(req.params.id);
    res.status(200).json({id:req.params.id});
})