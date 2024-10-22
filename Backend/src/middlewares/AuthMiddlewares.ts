import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { DecodedToken } from '../utils/types';
import AppError from '../utils/AppError';
import { getXataClient } from '../xata';

const xata = getXataClient();

export const protect = async (req: any, res: Response, next: NextFunction) => {
    try {
        let token: string | undefined;

        // checking if a request has the required token
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if(!token) {
            return next(new AppError('No token, authorization denied', 401));
        }

        // custom promise for token verification
        const decoded = await new Promise<DecodedToken>((resolve, reject) => {
            jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
                if(err) {
                    return reject(err);
                }
                resolve( decoded as DecodedToken);
            });

        });

        const currentUser = await xata.db.Users.read(decoded.id);

        if(!currentUser) {
            return next(new AppError('No user found', 404));
        }

        req.user = currentUser;
        next();

    }catch (err) {
        return next(new AppError("Headers authorization failed", 401));
    }
}

export const restrictTo = function (...roles: string[]) {
    return (req: any, res: Response, next: NextFunction) => {
        if(!req.user || !roles.includes(req.user.role!)) {
            return next(new AppError('You dont have permission to access this route', 403));
        }
        next();
    }
}
