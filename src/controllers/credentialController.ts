import { Prisma } from "@prisma/client"
import { Request, Response, query } from "express"
import { credentialSchema } from "../schemas/credentialSchema.js"
import httpStatus from "http-status"
import { newCredential, findCredentials, deleteCredential } from "../services/credentialService.js"
import { AuthenticatedRequest } from "@/middlewares/authenticationMiddleware.js"
import { number } from "joi"

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

async function getCredentials(req: AuthenticatedRequest, res: Response) {
    const { userId } = req
    const { id } = req.query;

    try {
        const credentials = await findCredentials(userId, Number(id))
        return res.status(200).send(credentials)
    } catch (error) {
        res.status(422).send(error.message)
    }
}

async function deleteSomeCredential(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    const {userId} = req;

    try {
        await deleteCredential(Number(id), userId)
        res.sendStatus(202)
    } catch (error) {
        res.status(422).send(error.message)
    }
}

export { createCredential, getCredentials, deleteSomeCredential }