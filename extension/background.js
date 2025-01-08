const glassdoor = "https://www.glassdoor.com/Job/index.htm";
const yCombinator = "https://www.workatastartup.com/jobs/";
const zipRecruiter = "https://www.ziprecruiter.com/jobs-search";
const script = {}

chrome.action.onClicked.addListener(async (tab) => {
    script["target"] = { tabId: tab.id };

    if (tab.url.startsWith(glassdoor)) {
        script["files"] = ["glassdoor.js"];
    } else if (tab.url.startsWith(yCombinator)) {
        script["files"] = ["yCombinator.js"];
    } else if (tab.url.startsWith(zipRecruiter)) {
        script["files"] = ["zipRecruiter.js"];
    }

    chrome.scripting.executeScript(script);
})

// todo: after executing, remove the script so can be run again