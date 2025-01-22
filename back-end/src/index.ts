import { Elysia, t } from "elysia";
import { cors } from '@elysiajs/cors';
import { addJob, getJobs, deleteJob, updateJob } from "../prisma/job";
import { getAccounts, addAccount, deleteAccount, updateAccount } from "../prisma/account";
import { PostJobSchema, PostAccountSchema, DeleteSchema, PutSchema, JobModifiableCols, AccountModifiableCols } from "../types";
import { ElysiaWS } from "elysia/dist/ws";

const app = new Elysia()

const clients = new Set<ElysiaWS>()
app.ws("/ws", {
    open(ws) {
        console.log("Client connected")
        clients.add(ws)
    },
    close(ws) {
        console.log("Client disconnected")
        clients.delete(ws)
    }
})

app.use(cors())
	
app.post("/jobs", async ({body}) => {
		console.log(body);
		await addJob(body)
	}, {
		body: PostJobSchema
	})
	.post("/accounts", async ({body}) => {
		console.log(body)
		await addAccount(body)
	}, {
		body: PostAccountSchema
	})

app.get("/jobs", async() => {
		const results = await getJobs()
		results.sort((a, b) => a["id"] - b["id"])
		return results
	})
	.get("/accounts", async () => {
		return await getAccounts()
	})

app.delete("/jobs", async({body}) => {
		await deleteJob(body["id"])
	}, {
		body: DeleteSchema
	})
	.delete("/accounts", async({body}) => {
		await deleteAccount(body["id"])
	}, {
		body: DeleteSchema
	})
	
app.put("/jobs", async({body}) => {
		await updateJob(body["id"], body["column"] as JobModifiableCols, body["newValue"])
	}, {
		body: PutSchema
	})
	.put("/accounts", async({body}) => {
		await updateAccount(body["id"], body["column"] as AccountModifiableCols, body["newValue"])
	}, {
		body: PutSchema
	})

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);