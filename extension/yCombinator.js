const header = document.querySelector("span.company-name")

const headerList = header.textContent.split("at")
const jobTitle = headerList[0].trim()
const companyName = headerList[1].split("(")[0].trim()

console.log(companyName, jobTitle)