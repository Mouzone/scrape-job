const glassdoor = "https://www.glassdoor.com/Job/index.htm";
const yCombinator = "https://www.workatastartup.com/jobs/";
const script = {}

chrome.action.onClicked.addListener(async (tab) => {
    script["target"] = { tabId: tab.id }

    if (tab.url.startsWith(glassdoor)) {
        script["files"] = ["glassdoor.js"]
    } else if (tab.url.startsWith(yCombinator)) {
        script["files"] = ["yCombinator.js"]
    }

    chrome.scripting.executeScript(script);
})

// todo: write the scripts and the fetch query inside the scripts once injected
// create db in supabase
// write the backend in go
// host backend on railway(?)
// figure out how to protect the api endpoint

