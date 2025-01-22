import { PrismaClient } from "@prisma/client";
import { JobModifiableCols, newJobInfo } from "../types";
const prisma = new PrismaClient();

export function addJob(newJobInfo: newJobInfo) {
    return prisma.job.create({
        data: newJobInfo
    });
}

export function getJobs() {
    return prisma.job.findMany()
}

export function deleteJob(id: number) {
    return prisma.job.delete({
        where: {
            id
        }
    })
}

export function updateJob(id: number, column: JobModifiableCols, newValue: string) {
    return prisma.job.update({
        where: {
            id
        },
        data: {
            [column]: newValue
        }
    })
}