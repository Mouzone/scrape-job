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
    message(ws, message) {
        console.log("here")
        const data = JSON.parse(message)
        console.log(data)
    },
    close(ws) {
        console.log("Client disconnected")
        clients.delete(ws)
    },
})

app.use(cors())

app.get("/jobs", async() => {
    const results = await getJobs()
    results.sort((a, b) => a["id"] - b["id"])
    return results
})
.get("/accounts", async () => {
    return await getAccounts()
})

app.post("/jobs", async ({body}) => {
		console.log(body);
		const result = await addJob(body)
        const message = JSON.stringify({type: "jobs", action: "post", payload: result})
        clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message)
            }
        })
	}, {
		body: PostJobSchema
	})
	.post("/accounts", async ({body}) => {
		console.log(body)
		const result = await addAccount(body)
        const message = JSON.stringify({type: "accounts", action: "post", payload: result})
        clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message)
            }
        })
	}, {
		body: PostAccountSchema
	})

app.delete("/jobs", async({body}) => {
		const result = await deleteJob(body["id"])
        const message = JSON.stringify({type: "jobs", action: "delete", payload: result})
        clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message)
            }
        })
	}, {
		body: DeleteSchema
	})
	.delete("/accounts", async({body}) => {
		const result = await deleteAccount(body["id"])
        const message = JSON.stringify({type: "accounts", action: "delete", payload: result})
        clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message)
            }
        })
	}, {
		body: DeleteSchema
	})
	
app.put("/jobs", async({body}) => {
		const result = await updateJob(body["id"], body["column"] as JobModifiableCols, body["newValue"])
        const message = JSON.stringify({type: "jobs", action: "put", payload: result})
        clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message)
            }
        })
	}, {
		body: PutSchema
	})
	.put("/accounts", async({body}) => {
		const result = await updateAccount(body["id"], body["column"] as AccountModifiableCols, body["newValue"])
        const message = JSON.stringify({type: "accounts", action: "put", payload: result})
        clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message)
            }
        })
	}, {
		body: PutSchema
	})

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);