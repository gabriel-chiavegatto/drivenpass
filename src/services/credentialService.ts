import { findTitleByUserId, createCredential, findCredentials, deleteCredential } from "../repositories/credentialRepository.js";
import { Prisma } from "@prisma/client";
import Cryptr from "cryptr";
import httpStatus from "http-status";
const cryptr = new Cryptr('secretKey')

async function newCredential(credential: Prisma.CredentialCreateInput, userId: number) {

    const repeatedTitle = await findTitleByUserId(userId, credential.title)
    if(repeatedTitle) throw new Error ("this title alredy exist")
    
    const hashPassword = cryptr.encrypt(credential.password)
    
    const credentialData = {...credential, password:hashPassword, userId}
    const created = await createCredential(credentialData)
    if(!created) throw new Error ("Can`t create your credential, try again")
}

export { newCredential }