import { Response } from "express";
import {IUser, UserResponse} from "../interfaces";

export const formatUserResponse = (user: IUser): UserResponse => ({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
});

// Handle Not Found
export const handleNotFound = <T>(resource: T | null, resourceName: string, res: Response): resource is T => {
    if(!resource){
        res.status(404);
        throw new Error(`${resourceName} not found`);
    }
    return true;
}