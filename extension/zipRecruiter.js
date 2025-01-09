function scrapeZipRecruiter() {
    const jobTitleElement = document.querySelector("h1");
    const companyNameElement = document.querySelector("h1 ~ a");
    
    const jobTitle = jobTitleElement.textContent;
    const companyName = companyNameElement.textContent;
    fetch("http://localhost:3000/job/add",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                jobsite: "ZipRecruiter",
                companyName,
                jobTitle
            })
        }
    );
}

scrapeZipRecruiter();