import { Router } from "express";
import { authenticateToken } from "../middlewares/authenticationMiddleware";
import { createCredential,getCredentials,deleteSomeCredential } from "../controllers/credentialController";

const credentialRouter = Router();

credentialRouter
    .all("/*", authenticateToken)
    .post("/",createCredential)
    .get("/", getCredentials)
    .delete("/:id", deleteSomeCredential)

export {credentialRouter}