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