import { Prisma } from "@prisma/client"
import { prisma } from "../config/database.js"

async function findByEmail(email: string) {
    return prisma.user.findUnique({
        where: {
            email
        }
    })
}

async function create(data:Prisma.UserCreateInput) {
    return prisma.user.create({ data });
}

export default { findByEmail, create }