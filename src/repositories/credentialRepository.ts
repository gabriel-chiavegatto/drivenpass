import { prisma } from "../config/database";
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
async function findUserCredentials(userId: number) {
    return prisma.credential.findMany({
        where: { userId }
    })
}
async function findCredentialsById(id: number) {
    return prisma.credential.findFirst({
        where: { id }
    })
}
async function deleteCredentialById(id: number) {
    return prisma.credential.delete({
        where: { id }
    })
}

export { findTitleByUserId, createCredential, findUserCredentials, findCredentialsById, deleteCredentialById }