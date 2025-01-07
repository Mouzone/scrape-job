const glassdoor = "https://www.glassdoor.com/Job/index.htm";
const yCombinator = "https://www.workatastartup.com/jobs/";

chrome.action.onClicked.addListener(async (tab) => {
    if (tab.url.startsWith(glassdoor)) {
        chrome.scripting.executeScript(
            {
                target: {tabId: tab.id},
                files: ["glassdoor.js"]
            }
        );
    } else if (tab.url.startsWith(yCombinator)) {
        chrome.scripting.executeScript(
            {
                target: {tabId: tab.id},
                files: ["yCombinator.js"]
            }
        );
    }
})

// todo: write the scripts and the fetch query inside the scripts once injected
// create db in supabase
// write the backend in go
// host backend on railway(?)
// figure out how to protect the api endpoint

