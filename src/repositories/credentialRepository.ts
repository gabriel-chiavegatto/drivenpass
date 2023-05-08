import { prisma } from "../config/database.js";
import { Prisma } from "@prisma/client";

async function findTitleByUserId(userId: number, title: string) {
    return prisma.credential.findFirst({
        where: {
            userId,
            title
        }
    })
}

async function createCredential(data: Prisma.CredentialCreateInput) {
    return prisma.credential.create({
        data
    })
}
async function findCredentials(userId: number) {
    return prisma.credential.findMany({
        where: {
            userId
        }
    })
}
async function deleteCredential(id: number) {
    return prisma.credential.delete({
        where: { id }
    })
}

export { findTitleByUserId, createCredential, findCredentials, deleteCredential }