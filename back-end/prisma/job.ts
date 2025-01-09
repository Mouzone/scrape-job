import type {Job} from "../types";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export function addJob(job: Job) {
    return prisma.job.create({
        data: job
    });
}