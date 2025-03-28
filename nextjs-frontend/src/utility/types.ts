import { fields } from "./consts";

export type Job = {
    id: string;
    jobsite: string;
    company: string;
    title: string;
};

export type Account = {
    id: string;
    company: string;
    username: string;
    password: string;
};
export interface Fields {
    jobs: Job;
    accounts: Account;
}

export type FormType = keyof Fields;

export type JobKeys = keyof Job;

export type AccountKeys = keyof Account;
