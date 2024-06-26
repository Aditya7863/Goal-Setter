import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

export const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Get user from the token
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (err) {
            console.log(err)
            const error = new Error(`Not authorized`);
            error.status = 401;
            return next(error);
        }
    }
    if(!token){
        const error = new Error(`Not authorized, no token`);
        error.status = 401;
        return next(error);
    }
})