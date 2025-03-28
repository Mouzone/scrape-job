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
    accounts: ["company", "username", "password"] as AccountKeys[],
    jobs: ["applied", "jobsite", "company", "title"] as JobKeys[],
};
