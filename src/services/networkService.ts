import { createNetwork, deleteNetworkById, findNetworkById, findUserNetworks } from "../repositories/networkRepository.js";
import { Prisma } from "@prisma/client";
import Cryptr from "cryptr";
import httpStatus from "http-status";
import { number } from "joi";
const cryptr = new Cryptr("Secret");

async function newNetwork(data: Prisma.NetworkCreateInput, userId: number) {

    const hashPassword = cryptr.encrypt(data.password)

    const networkData = { ...data, password: hashPassword, userId }

    await createNetwork({ ...networkData })
}
async function viewNetworks(userId: number, id: number) {
    if (id) {
        const wifi = await findNetworkById(id)
        if (wifi.userId != userId) throw httpStatus.UNAUTHORIZED
        const decryptedPassword = cryptr.decrypt(wifi.password)
        return { ...wifi, password: decryptedPassword }
    } else {
        const wifis = await findUserNetworks(userId)
        wifis.forEach(wifi => {
            const decryptedPassword = cryptr.decrypt(wifi.password)
            wifi.password = decryptedPassword
        })
        return wifis
    }
}

async function deleteNet(id:number, userId:number) {
    const wifi = await findNetworkById(id)
    if(wifi.userId != userId) throw httpStatus.UNAUTHORIZED

    await deleteNetworkById(id)
}

export { newNetwork,viewNetworks, deleteNet }