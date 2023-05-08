import {
    findTitleByUserId,
    createCredential,
    findUserCredentials,
    findCredentialsById,
    deleteCredentialById
} from "../repositories/credentialRepository.js";
import { Prisma } from "@prisma/client";
import Cryptr from "cryptr";
import httpStatus from "http-status";
const cryptr = new Cryptr('secretKey')

async function newCredential(credential: Prisma.CredentialCreateInput, userId: number) {

    const repeatedTitle = await findTitleByUserId(userId, credential.title)
    if (repeatedTitle) throw new Error("this title alredy exist")

    const hashPassword = cryptr.encrypt(credential.password)

    const credentialData = { ...credential, password: hashPassword, userId }
    const created = await createCredential(credentialData)
    if (!created) throw new Error("Can`t create your credential, try again")
}
async function findCredentials(userId: number, id: number) {
    if (!id) {
        const credentials = await findUserCredentials(userId)
        credentials.forEach(credential => {
            console.log('here')
            const decryptedPassword = cryptr.decrypt(credential.password)
            credential.password = decryptedPassword
        })
        return credentials
    }
    else {
        const credential = await findCredentialsById(id);
        const decryptedPassword = cryptr.decrypt(credential.password)
        return { ...credential, password: decryptedPassword }
    }

}
async function deleteCredential(id: number) {

}
export { newCredential, findCredentials, deleteCredential }