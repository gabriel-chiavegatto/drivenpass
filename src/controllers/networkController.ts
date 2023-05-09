import { AuthenticatedRequest } from "../middlewares/authenticationMiddleware.js";
import { Response } from "express";
import { networkSchema } from "../schemas/networkSchema.js";
import { newNetwork } from "../services/networkService.js";
import { Prisma } from "@prisma/client";

async function createNetwork(req:AuthenticatedRequest,res:Response) {
    const network = req.body as Prisma.NetworkCreateInput;
    const user = req.userId as number;
    try {
        const validation = networkSchema.validate(req.body)
        if(validation.error) throw new Error (`${validation.error.details}`)
        await newNetwork(network, user)

        res.sendStatus(201)

    } catch (error) {
        res.status(422).send(error.message)
    }  
}

async function getNetworks(req:AuthenticatedRequest,res:Response) {
    
}

async function deleteSomeNetwork(req:AuthenticatedRequest,res:Response) {
    
}

export { createNetwork, getNetworks, deleteSomeNetwork }