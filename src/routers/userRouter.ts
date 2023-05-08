import { Router } from "express";
import { createUser, login } from "../controllers/userController.js";

const userRouter = Router();

userRouter.post("/", createUser);
userRouter.post("/login", login)

export { userRouter}