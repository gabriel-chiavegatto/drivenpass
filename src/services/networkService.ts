import { createNetwork } from "../repositories/networkRepository.js";
import { Prisma } from "@prisma/client";
import Cryptr from "cryptr";
const cryptr = new Cryptr("Secret");

async function newNetwork(data:Prisma.NetworkCreateInput, userId:number){

    const hashPassword = cryptr.encrypt(data.password)

    const networkData = { ...data, password: hashPassword, userId }

    await createNetwork({...networkData})
}


export { newNetwork}