import { PrismaClient } from "@prisma/client";
import { AccountModifiableCols, newAccountInfo } from "../types";
const prisma = new PrismaClient()

export function getAccounts() {
    return prisma.account.findMany()
}

export function addAccount(newAccountInfo: newAccountInfo) {
    return prisma.account.create({
        data: newAccountInfo
    })
}

export function deleteAccount(id: number) {
    return prisma.account.delete({
        where: {
            id
        }
    })
}

export function updateAccount(id: number, column: AccountModifiableCols, newValue: string) {
    return prisma.account.update({
        where: {
            id
        },
        data: {
            [column]: newValue
        }
    })
}