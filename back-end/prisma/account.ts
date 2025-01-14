import { PrismaClient } from "@prisma/client";
import { Account } from "../types";
const prisma = new PrismaClient()

export function getAccounts() {
    return prisma.account.findMany()
}

export function addAccount(account: Account) {
    return prisma.account.create({
        data: account
    })
}

export function deleteAccount(id) {
    return prisma.account.delete({
        where: {
            id
        }
    })
}