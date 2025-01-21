export type Type = "jobs" | "accounts"
export type Job = {
    id: number,
    applied: string,
    company: string,
    job: string,
    title: string
}
export type JobKeys = keyof Job
export type Account = {
    id: number,
    company: string,
    username: string,
    password: string
}
export type AccountKeys = keyof Account
export type searchableKeys<T> = Exclude<keyof T, "id">
export type Data = Account[] | Job[]
export type Keys = AccountKeys | JobKeys