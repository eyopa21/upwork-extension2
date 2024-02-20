
// Listen for messages from the content script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // Check if the message action is to get the current URL
  if (request.action === "getCurrentUrl") {
    // Query the active tab to get its URL
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      // Get the URL of the active tab
      var url = tabs[0]?.url;
      // Extract the domain from the URL
      var domain = new URL(url).hostname;
      console.log("domain", domain)
      // Send the domain back to the content script as a response
      sendResponse({ domain: domain });
    });
    // Return true to indicate that the response will be sent asynchronously
    return true;
  }
});
