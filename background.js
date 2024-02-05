// background.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "getCurrentUrl") {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      var url = tabs[0]?.url;
        var domain = new URL(url).hostname;
        console.log("domain", domain)
      sendResponse({ domain: domain });
    });
    return true; // Required to indicate an asynchronous response
  }
});


// background.js

// Logic to determine the condition under which the icon should change
function determineIconState() {
    let time = 5;
    if (4>time) {
        return false
    }
    else  return true;
}

// Function to set the extension icon based on the current state
function setIcon() {
    // const condition = false
    // if(condition) {
    //     chrome.browserAction.setIcon({ path: './icon.png' });
    // } else {
    //     chrome.browserAction.setIcon({ path: './safari.jpg' });
  // }
  

  console.log("changing icon")
}

//setIcon()

// Listen for changes that might require updating the icon
// For example, you might listen for events or messages from content scripts
// and update the icon accordingly
// Example:

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    // Update the icon whenever a message is received

    console.log(message, sender, sendResponse)
    setIcon();
});

