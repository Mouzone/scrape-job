import { Elysia, t } from "elysia";
import { cors } from '@elysiajs/cors';
import { addJob, getJobs, deleteJob, updateJob } from "../prisma/job";
import { getAccounts, addAccount, deleteAccount, updateAccount } from "../prisma/account";
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
		results.forEach(result => result["applied"] = formatDateTime(result["applied"]))
		results.sort((a, b) => a["id"] - b["id"])
		return results
	})
	.get("/accounts", async () => {
		return await getAccounts()
	})
	.delete("/jobs", async({body}) => {
		await deleteJob(body["id"])
	}, {
		body: t.Object({
			id: t.Integer()
		})
	})
	.delete("/accounts", async({body}) => {
		await deleteAccount(body["id"])
	}, {
		body: t.Object({
			id: t.Integer()
		})
	})
	.put("/jobs", async({body}) => {
		await updateJob(body["id"], body["column"], body["newValue"])
	}, {
		body: t.Object({
			id: t.Integer(),
			column: t.String(),
			newValue: t.String()
		})
	})
	.put("/accounts", async({body}) => {
		await updateAccount(body["id"], body["column"], body["newValue"])
	}, {
		body: t.Object({
			id: t.Integer(),
			column: t.String(),
			newValue: t.String()
		})
	})
	.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);