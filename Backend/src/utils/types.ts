import { Request } from "express";

// Getting the user and role
export interface User {
    xata_id: string;
    role: string;
}

// Exporting the userRquest interface
export interface userRquest extends Request {
    user: User;
}

// Exporting the DecodedToken interface
export interface DecodedToken {
    id: string;
}