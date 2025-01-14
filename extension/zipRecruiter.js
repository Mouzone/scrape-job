function scrapeZipRecruiter() {
    const jobTitleElement = document.querySelector("h1");
    const companyElement = document.querySelector("h1 ~ a");
    
    const title = jobTitleElement.textContent;
    const company = companyElement.textContent;
    fetch("http://localhost:3000/jobs",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                jobsite: "ZipRecruiter",
                company,
                title
            })
        }
    );
}

scrapeZipRecruiter();