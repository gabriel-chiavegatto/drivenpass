import { authenticateToken } from "../middlewares/authenticationMiddleware";
import { Router } from "express";
import { createNetwork, getNetworks, deleteSomeNetwork } from "../controllers/networkController";

const networkRouter = Router();
networkRouter.all("/*", authenticateToken)
    .post("/", createNetwork)
    .get("/", getNetworks)
    .delete("/:id", deleteSomeNetwork)

export { networkRouter } 