import { Elysia, t } from "elysia";
import { cors } from '@elysiajs/cors';
import { addJob } from "../prisma/job";
import { JobSchema } from "../types";

const app = new Elysia()
    .use(cors())
    .post("/job/add", async ({body}) => {
        console.log(body);
        await addJob(body)
    }, {
       body: JobSchema
    })
    .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);