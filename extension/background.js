const glassdoor = "https://www.workatastartup.com/jobs/";
const yCombinator = "https://www.glassdoor.com/Job/index.htm";

chrome.actions.onClicked.addListener(async (tab) => {
    if (tab.startsWith(glassdoor)) {
        tab.scripting.executeScript("glassdoor.js")
    } else {
        tab.scripting.executeScript("y-comb.js")
    }
})