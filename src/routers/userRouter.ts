import { Router } from "express";
import { createUser, login } from "../controllers/userController";

const userRouter = Router();

userRouter.post("/", createUser);
userRouter.post("/login", login)

export { userRouter}