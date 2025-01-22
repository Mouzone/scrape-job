import { t } from 'elysia'

export const PostJobSchema = t.Object({
    jobsite: t.String(),
    company: t.String(),
    title: t.String()
})

export const PostAccountSchema = t.Object({
    company: t.String(),
    username: t.String(),
    password: t.String()
})

export const DeleteSchema = t.Object({
    id: t.Integer()
})

export const PutSchema = t.Object({
    id: t.Integer(),
    column: t.String(),
    newValue: t.String()
})

export type JobModifiableCols = "jobsite" | "company" | "title"
export type AccountModifiableCols =  "company" | "username" | "password"

export type newJobInfo = {
    jobsite: string,
    company: string,
    title: string
}

export type newAccountInfo = {
    company: string,
    username: string,
    password: string
}