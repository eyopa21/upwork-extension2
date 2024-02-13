// background.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "getCurrentUrl") {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      var url = tabs[0]?.url;
        var domain = new URL(url).hostname;
        console.log("domain", domain)
      sendResponse({ domain: domain });
    });
    return true; 
  }
});




