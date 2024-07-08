import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
// @desc Register new user
// @route POST /api/users/register
// @access Public
export const registerUser = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        const error = new Error(`Please add all the fields`);
        error.status = 400;
        return next(error);
    }
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        const error = new Error(`User already exists`);
        error.status = 400;
        return next(error);
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })
    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        const error = new Error(`Invalid user data`);
        error.status = 400;
        return next(error);
    }
})

// @desc Login user
// @route POST /api/users/login
// @access Public
export const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        const error = new Error(`Invalid credentials`);
        error.status = 400;
        return next(error);
    }
})
// @desc GEt user data
// @route GET /api/users/me
// @access Private
export const getMe = asyncHandler(async (req, res, next) => {
    res.status(200).json(req.user);
})

// GEnerate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}