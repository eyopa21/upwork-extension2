// Get references to the power button and add button elements
const powerButton = document.getElementById("powerButton");
const addButton = document.getElementById("addButton");

function togglePowerIcon() {
  // Toggle the 'power-on' class on the power button
  if (powerButton.innerHTML.includes('green')) {
    powerButton.innerHTML = `<img src='/assets/Power-button-red.svg' alt='power off' class='w-32 h-32'/>`
  } else {
     powerButton.innerHTML = `<img src='/assets/Power-button-green.svg' alt='power off' class='w-32 h-32'/>`
 }
}

// Event listener for the power button
let icon = 'Power-button-green.svg'
powerButton.addEventListener("click", function () {
  // Toggle the 'power-on' class on the power button
  togglePowerIcon();
  
  // do the main check and toggle the left bar
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "toggleLeftBar" });
    });
  // Check if the chrome.storage.local API is available
  if (chrome.storage?.local) {
    // Retrieve the 'featureEnabled' data from local storage
    chrome.storage.local.get("featureEnabled", function (data) {
      // Get the current state of the feature or default to false
      var featureEnabled = data.featureEnabled || false;
      // Update the feature status in local storage
      chrome.storage.local.set({ featureEnabled: !featureEnabled });
      //refresh the page
     
    });
    
    
  }
});

// Function to register a domain
const RegisterDomain = (domain) => {
  // Show spinner and hide button text
  document.getElementById("spinner").classList.replace("hidden", "block");
  document.getElementById("button-text").classList.replace("block", "hidden");

  // API endpoint for adding a domain
  const url = "https://prospectregistry.com/api/v1/domain/add";
  // Data payload
  const data = {
    domain_url: domain,
  };
  // Fetch options
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  // Make a POST request to add the domain
  fetch(url, options)
    .then((data) => {
      console.log("Success:", data);
      // Hide spinner and show button text
      document.getElementById("spinner").classList.replace("block", "hidden");
      document.getElementById("button-text").classList.replace("hidden", "block");
      // Send message to content script to indicate domain addition success
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "domainAddSuccess" });
        window.close();
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      // Hide spinner and show button text
      document.getElementById("spinner").classList.replace("block", "hidden");
      document.getElementById("button-text").classList.replace("hidden", "block");
      // Send message to content script to indicate domain addition failure
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "domainAddFail" });
      });
    });
};

// Get the current URL using chrome.runtime API
chrome.runtime?.sendMessage({ action: "getCurrentUrl" }, function (response) {
  if (chrome.runtime.lastError) {
    // Handle errors
    console.error("Error:", chrome.runtime.lastError.message);
  } else {
    // Event listener for the add button
    addButton.addEventListener("click", function () {
      console.log("add to DB", response.domain);
      // Register the domain
      RegisterDomain(response.domain);
    });
  }
});

// Check if the feature is enabled from local storage
chrome.storage?.local.get("featureEnabled", function (data) {
  var featureEnabled = data.featureEnabled || false;
  if (featureEnabled) {
    console.log("enabled");
    powerButton.innerHTML = "<img src='/assets/Power-button-red.svg' alt='power off' class='w-32 h-32'/>"

  } else {
    console.log("disabled");
     powerButton.innerHTML = "<img src='/assets/Power-button-green.svg' alt='power off' class='w-32 h-32'/>"

  }
});



// A function to toggle the visiblity of the password input field
function togglePasswordVisibility() {
  var passwordField = document.getElementById("password");
   
    if (passwordField.type === "password") {
      passwordField.type = "text";
    } else {
      passwordField.type = "password";
 
    }
  }