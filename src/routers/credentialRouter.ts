import { Router } from "express";
import { authenticateToken } from "../middlewares/authenticationMiddleware.js";
import { createCredential } from "../controllers/credentialController.js";

const credentialRouter = Router();

credentialRouter
    .all("/*", authenticateToken)
    .post("/",createCredential)

export {credentialRouter}