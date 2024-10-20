import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import { getXataClient } from "../xata";

const xata = getXataClient();

export const  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await xata.db.Users.create(req.body);

        res.status(200).json({
            message: "User created successfully",
            data: user
        });

    }catch (err) {
        return next(new AppError("Error creating new user", 500));
    }
}

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await xata.db.Users.getAll();

        res.status(200).json({
            message: "Users fetched successfully",
            data: users
        });

    }catch (err) {
        return next(new AppError("Error fetching all users", 500));
    }
}

export const updateUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id;

        const user = await xata.db.Users.update(userId, req.body);

        res.status(200).json({
            message: "User updated successfully",
            data: user
        });

    }catch (err) {
        return next(new AppError("Error updating user", 500));
    }
}

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id;

        const user = await xata.db.Users.read(userId)

        if(!user) {
            return next(new AppError("Oops!! User not found", 500));
        }

        res.status(200).json({
            message: "User fetched successfully",
            data: user
        })
    }catch (err) {
        return next(new AppError("Error fetching the user", 500))
    }
}

export const deleteUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id;

        await xata.db.Users.delete(userId);

        res.status(200).json({
            message: "User deleted successfully"
        });

    }catch (err) {
        return next(new AppError("Error deleting user", 500))
    }
}



