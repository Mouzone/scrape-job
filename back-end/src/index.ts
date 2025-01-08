import { Elysia, t } from "elysia";
import { cors } from '@elysiajs/cors'

const app = new Elysia()
    .use(cors())
    .post("/job/add", ({body: {companyName, jobTitle}}) => console.log({companyName, jobTitle}), {
        body: t.Object({
            companyName: t.String(),
            jobTitle: t.String()
        })
    })
    .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

// todo: maybe add website scraped from, and link