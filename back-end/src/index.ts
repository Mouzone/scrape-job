import { Elysia, t } from "elysia";
import { cors } from '@elysiajs/cors'
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

const app = new Elysia()
    .use(cors())
    .post("/job/add", async ({body: {jobsite, company, title}}) => {
        console.log({jobsite, company, title})
        await prisma.job.create({
            data: {
                jobsite,
                company,
                title
            }
        })
    }, {
        body: t.Object({
            jobsite: t.String(),
            company: t.String(),
            title: t.String()
        })
    })
    .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);