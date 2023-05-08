import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import { prisma } from '../config/database.js';
import { Request, Response, NextFunction } from 'express';

export async function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(httpStatus.UNAUTHORIZED).send('Send valid token')

    const token = authHeader.split(' ')[1]
    if (!token) return res.status(httpStatus.UNAUTHORIZED).send('Send valid token')

    try {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;

        const session = await prisma.session.findFirst({
            where: { token }
        })
        if (!session) return res.status(httpStatus.UNAUTHORIZED).send('Send valid token')

        req.userId = session.userId;

        return next()

    } catch (error) {
        return res.status(httpStatus.UNAUTHORIZED).send('Token error')
    }

}


export type AuthenticatedRequest = Request & JWTPayload;

type JWTPayload = {
    userId: number;
};
