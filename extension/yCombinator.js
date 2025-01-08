const header = document.querySelector("span.company-name");

const headerList = header.textContent.split("at");
const jobTitle = headerList[0].trim();
const companyName = headerList[1].split("(")[0].trim();

fetch("http://localhost:3000/job/add",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            companyName,
            jobTitle
        })
    }
);