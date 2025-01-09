function scrapeGlassDoor() {
    const companyElement = document.querySelector("h4.heading_Heading__BqX5J.heading_Subhead__Ip1aW");
    const jobTitleElement = document.querySelector("h1.heading_Heading__BqX5J.heading_Level1__soLZs");
    
    const company = companyElement.textContent;
    const title = jobTitleElement.textContent;
    
    fetch("http://localhost:3000/job/add",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                jobsite: "Glassdoor",
                company,
                title
            })
        }
    );
}

scrapeGlassDoor();