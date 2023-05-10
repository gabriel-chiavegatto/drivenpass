import { prisma } from "../config/database";
import { Prisma } from "@prisma/client";

async function createNetwork(data: Prisma.NetworkCreateInput) {
    return prisma.network.create({
        data
    })
}
async function findUserNetworks(userId: number) {
    return prisma.network.findMany({
        where: { userId }
    })
}
async function findNetworkById(id: number) {
    return prisma.network.findFirst({
        where: { id }
    })
}
async function deleteNetworkById(id: number) {
    return prisma.network.delete({
        where: { id }
    })
}

export { createNetwork, findUserNetworks, findNetworkById, deleteNetworkById }