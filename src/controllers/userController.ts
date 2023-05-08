import { Request, Response } from "express";
import httpStatus from "http-status";
import { newUser,userLogin } from "../services/userService.js";

export async function createUser(req:Request, res:Response){
    const {email, password} = req.body;
    
    try {
        if(!email || !password) throw httpStatus.UNAUTHORIZED
        const user = await newUser({email, password})
        return res.sendStatus(httpStatus.CREATED)
    } catch (error) {
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error);
    }
}
export async function login(req:Request, res:Response) {
    const {email, password} = req.body;
    try {
        if(!email || !password) throw httpStatus.UNAUTHORIZED;
        const token = await userLogin({email,password})
        return res.status(httpStatus.OK).send(token)
    } catch (error) {
        return res.sendStatus(httpStatus.BAD_REQUEST)
    }
}