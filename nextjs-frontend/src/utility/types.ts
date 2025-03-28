import { fields } from "./consts";

interface fields {
    jobs: {
        jobsite: string;
        company: string;
        title: string;
    };
    accounts: {
        company: string;
        username: string;
        password: string;
    };
}
export type FormType = keyof fields;

export type JobKeys = keyof fields["jobs"];

export type AccountKeys = keyof fields["accounts"];
