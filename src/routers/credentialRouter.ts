import { Router } from "express";
import { authenticateToken } from "../middlewares/authenticationMiddleware.js";
import { createCredential,getCredentials,deleteSomeCredential } from "../controllers/credentialController.js";

const credentialRouter = Router();

credentialRouter
    .all("/*", authenticateToken)
    .post("/",createCredential)
    .get("/", getCredentials)
    .delete("/:id", deleteSomeCredential)

export {credentialRouter}