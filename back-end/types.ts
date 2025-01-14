import { t } from 'elysia'

export const JobSchema = t.Object({
    jobsite: t.String(),
    company: t.String(),
    title: t.String()
})

export type Job = {
    jobsite: string
    company: string
    title: string
}

export const AccountSchema = t.Object({
    company: t.String(),
    username: t.String(),
    password: t.String()
})

export type Account = {
    company: string
    username: string
    password: string
}