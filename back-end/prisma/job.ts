import type {Job} from "../types";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export function addJob(job: Job) {
    return prisma.job.create({
        data: job
    });
}

export function getJobs() {
    return prisma.job.findMany()
}

export function deleteJob(id) {
    return prisma.job.delete({
        where: {
            id
        }
    })
}

export function updateJob(id, column, newValue) {
    return prisma.job.update({
        where: {
            id
        },
        data: {
            [column]: newValue
        }
    })
}