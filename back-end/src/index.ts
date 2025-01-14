import { Elysia, t } from "elysia";
import { cors } from '@elysiajs/cors';
import { addJob, getJobs } from "../prisma/job";
import { getAccounts, addAccount } from "../prisma/account";
import { JobSchema, AccountSchema } from "../types";
import formatDateTime from "./utility/formatDateTime";

const app = new Elysia()
    .use(cors())
    .post("/jobs", async ({body}) => {
        console.log(body);
        await addJob(body)
    }, {
       body: JobSchema
    })
    .post("/accounts", async ({body}) => {
        console.log(body)
        await addAccount(body)
    }, {
        body: AccountSchema
    })
    .get("/jobs", async() => {
       const results = await getJobs()
    //  modifies the objects inside results, so we don't have to set the output to another array
       results.map(result => result["applied"] = formatDateTime(result["applied"]))
       return results
    })
    .get("/accounts", async () => {
        return await getAccounts()
    })
    .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);