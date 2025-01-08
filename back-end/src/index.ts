import { Elysia } from "elysia";

const app = new Elysia()
    .post("/job", () => console.log("hi"))
    .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
