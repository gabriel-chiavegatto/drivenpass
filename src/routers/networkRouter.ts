import { authenticateToken } from "../middlewares/authenticationMiddleware.js";
import { Router } from "express";
import { createNetwork, getNetworks, deleteSomeNetwork } from "../controllers/networkController.js";

const networkRouter = Router();
networkRouter.all("/*", authenticateToken)
    .post("/", createNetwork)
    .get("/", getNetworks)
    .delete("/:id", deleteSomeNetwork)

export { networkRouter } 