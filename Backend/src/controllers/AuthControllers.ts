import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { getXataClient } from "../xata";
import AppError from "../utils/AppError";
import { User, DecodedToken } from "../utils/types"
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import { error } from "console";

const xata = getXataClient();

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(!req.body) {
            return next(new AppError('Please provide name, email, and password', 400));
        }

        if(req.body.userpassword !== req.body.passwordConfirm) {
            return next(new AppError('Passwords do not match', 400));
        }

        // we're not sending the password confirm to database
        req.body.passwordConfirm = undefined;

        // has the password
        const hashedPassword = await bcrypt.hash(req.body.userpassword, 15);
        req.body.userpassword = hashedPassword;
        
        // creating the user with the passed json
        const user = await xata.db.Users.create(req.body);

        // Assign JWT token to created user
        const token = jwt.sign({ id: user.xata_id}, process.env.JWT_SECRET!, { expiresIn: '10d'});

        res.status(201).json({
            status: 'success',
            token,
            data: user
        });

    }catch (err) {
        console.log(err);
        return next(new AppError('Failed to create user', 500));
    }
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { useremail, userpassword } = req.body;
        
        // validating user details
        if(!useremail || !userpassword) {
            return next(new AppError('Please provide email and password', 400));
        }

        // Comparing users using email
        const user = await xata.db.Users.filter({ useremail }).select(['username', 'userpassword', 'role', 'xata_id']).getFirst();

        if(!user) {
            return next(new AppError('User not found', 401));
        }

        // compare passwords if they match
        const match = await bcrypt.compare(userpassword, user.userpassword);

        if(!match) {
            return next(new AppError('Invalid credentials', 401));
        }

        // Assign JWT token
        const token = jwt.sign({ id: user.xata_id }, process.env.JWT_SECRET!, { expiresIn: '10d'});

        res.status(200).json({
            status: 'Logged in successfully',
            token,
            data: user
        });

    }catch (err) {
        return next(new AppError('Failed to create user', 500));
    }
}

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await xata.db.Users.getAll();

        if(!users) {
            return next(new AppError("No Users found", 400));
        }

        res.status(200).json({
            message: "Users fetched successfully",
            data: users
        });

    } catch(err) {
        return next(new AppError('Error fetching users', 500));
    }
}

export const deleteUserbyId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id;

        if(!userId) {
            return next(new AppError('UserId not found', 404));
        }

        await xata.db.Users.delete(userId);

        res.status(200).json({ message: "User deleted successfully "})
    }catch (err) {
        return next(new AppError('Error deleting user', 500));
    }
}

export const updateUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id;

        if(!userId) {
            return next(new AppError('UserId not found', 404));
        }

        const updateduser = await xata.db.Users.read(userId, req.body);

        res.status(200).json({
            message: "User details updated successfully",
            data: updateduser
        });

    }catch (err) {
        return next(new AppError('Error updating user', 500));
    }
}