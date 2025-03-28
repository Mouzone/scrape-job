import { AccountKeys, JobKeys } from "./types";

export const fields = {
    jobs: {
        jobsite: "",
        company: "",
        title: "",
    },
    accounts: {
        company: "",
        username: "",
        password: "",
    },
};

export const columns = {
    jobs: ["applied", "jobsite", "company", "title"] as JobKeys[],
    accounts: ["company", "username", "password"] as AccountKeys[],
};
