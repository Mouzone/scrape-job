import { Elysia, t } from "elysia";
import { cors } from '@elysiajs/cors';
import { addJob, getJobs } from "../prisma/job";
import { getAccounts } from "../prisma/account";
import { JobSchema } from "../types";

const app = new Elysia()
    .use(cors())
    .post("/job/add", async ({body}) => {
        console.log(body);
        await addJob(body)
    }, {
       body: JobSchema
    })
    .get("/jobs", async() => {
       return await getJobs()
    })
    .get("/accounts", async () => {
        return await getAccounts()
    })
    .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);