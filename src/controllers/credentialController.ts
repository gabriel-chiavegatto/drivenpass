import { Prisma } from "@prisma/client"
import { Request, Response } from "express"
import { credentialSchema } from "../schemas/credentialSchema.js"
import httpStatus from "http-status"
import { newCredential } from "../services/credentialService.js"
import { AuthenticatedRequest } from "@/middlewares/authenticationMiddleware.js"

async function createCredential(req: AuthenticatedRequest, res: Response) {
    const credential = req.body as Prisma.CredentialCreateInput
    const { userId } = req

    try {
        
        const validateBody = credentialSchema.validate(credential)
        if (validateBody.error) return res.status(httpStatus.UNAUTHORIZED).send(validateBody.error.message)

        await newCredential(credential, userId)

        return res.sendStatus(201)

    } catch (error) {
        return res.status(422).send(error.message)
    }
}

export { createCredential }