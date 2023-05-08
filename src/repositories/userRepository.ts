import { Prisma } from "@prisma/client"
import { prisma } from "../config/database.js"

async function findByEmail(email: string) {
    return prisma.user.findUnique({
        where: {
            email
        }
    })
}

async function createUser(data: Prisma.UserCreateInput) {
    return prisma.user.create({ data });
}

async function findSessionByUserId(userId: number) {
    return prisma.session.findFirst({
        where: {
            userId
        }
    })
}
async function createSession(userId: number, token: string) {
    return prisma.session.create({
        data: {
            userId, token
        }
    })
}
async function updateSession(id: number, token: string) {
    return prisma.session.update({
        where: {
            id
        },
        data: {
            token
        }
    })
}

export default {
    findByEmail,
    createUser,
    findSessionByUserId,
    createSession,
    updateSession
}