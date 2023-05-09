import { prisma } from "./config/database";

export async function cleanDb() {
    await prisma.user.deleteMany({});
    await prisma.session.deleteMany({})
    await prisma.network.deleteMany({});
    await prisma.credential.deleteMany({});
}