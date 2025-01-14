import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export function getAccounts() {
    return prisma.account.findMany()
}

export function addAccount(company: String, username: String, password: String) {
    return prisma.account.create({
        company,
        username,
        password
    })
}