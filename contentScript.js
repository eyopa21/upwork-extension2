// Create a style element to add custom styles
var styleElement = document.createElement("style");

// Define CSS styles for toast notifications
var style = `
.hidden {
  display: none;
}

.block {
  display: block;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.spinning {
  animation: spin 1s linear infinite;
}

.toast-progress {
  position: absolute;
  display: block;
  bottom: 0;
  left: 0;
  height: 5px;
  width: 100%;
  background: #b7b7b7;
}

.toast.toast-success {
  background: #95eab8;
}

.toast.toast-success .toast-progress {
  background-color: #2EFF3F;
}

.toast.toast-danger {
  background: #efaca5;
}

.toast.toast-danger .toast-progress {
  background-color: #FF2A00;
}

.place-toast-left {
  top: 5px !important;
  left: 10px !important;
}

.place-toast-right {
  top: 25px !important;
  right: 25px !important;
  padding: 1rem !important;
  animation: slideInRight 0.3s ease-in-out forwards, fadeOut 0.5s ease-in-out forwards 3s;
  transform: translateX(110%);
}

.toast {
  height: auto;
  font-size: 16px;
  position: fixed;
  max-width: 300px;
  background: #fff;
  border-radius: 4px;
  box-shadow: -1px 1px 10px rgba(0, 0, 0, 0.3);
  z-index: 2147483647;
}

/* Define keyframe animations for toast notifications */
@keyframes slideInRight {
  0% {
    transform: translateX(110%);
  }
  75% {
    transform: translateX(-10%);
  }
  100% {
    transform: translateX(0%);
  }
}

@keyframes slideOutRight {
  0% {
    transform: translateX(0%);
  }
  25% {
    transform: translateX(-10%);
  }
  100% {
    transform: translateX(110%);
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes toastProgress {
  0% {
    width: 100%;
  }
  100% {
    width: 0%;
  }
}`;

// Apply the styles to the style element
styleElement.innerHTML = style;
document.head.appendChild(styleElement);

// Create a link element to import Google Fonts
var GFont = document.createElement("link");
GFont.rel = "stylesheet";
GFont.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
document.head.appendChild(GFont);

// Create a loader element to indicate loading state
let loader = document.createElement("div");
loader.style.cssText =
  "z-index:2147483647 !important; position: fixed !important;background-color: #4299e1 !important;width: 2.5rem !important; height: 2.5rem !important; right: 0 !important; top: 0 !important;";
loader.classList.add("hidden");
loader.innerHTML = `<svg
                    class="spinning"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.2"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      fill="#FFFFFF"
                    />
                    <path
                      d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z"
                      fill="#FFFFFF"
                    /></svg>`;

document.body.appendChild(loader);

// Define icons for toast notifications
let icon = {
  success: '<span class="material-symbols-outlined">✔</span>',
  danger: '<span class="material-symbols-outlined">⚠︎</span>',
};

// Function to show the leftbar
showLeftBar = (toastType = "info") => {
  // Ensure toast type is valid
  if (!Object.keys(icon).includes(toastType)) toastType = "info";

  // Create the toast element
  let box = document.createElement("div");
  box.classList.add("toast", `toast-${toastType}`, "place-toast-left");
  box.innerHTML = ` <div class="toast-content-wrapper" style="z-index: 2147483647;width: 500px; min-width: 300px; display: flex; justify-content: space-between; align-items: center;">  
                      <div class="toast-progress" ></div> 
                    </div>`;

  document.body.appendChild(box);
};

// Function to show an adding toast notification
showAddingToast = (
  message = "Sample Message",
  toastType = "info",
  duration = 5000
) => {
  // Ensure toast type is valid
  if (!Object.keys(icon).includes(toastType)) toastType = "info";

  // Create the toast element
  let box = document.createElement("div");
  box.classList.add("toast", `toast-${toastType}`, "place-toast-right");
  box.innerHTML = ` <div class="toast-content-wrapper" style="z-index: 2147483647; display: flex; justify-content: space-between; align-items: center;"> 
                      <div class="toast-icon" style=" padding: 0.35rem 0.5rem; font-size: 1.5rem;"> 
                        ${icon[toastType]} 
                      </div> 
                      <div class="toast-message" style="flex: 1; font-size: 16px; color: #000000; padding: 0.5rem;">${message}</div> 
                      <div class="toast-progress" style="animation: toastProgress 3s ease-in-out forwards; background-color: #10B981 !important;" ></div> 
                    </div>`;

  // Set duration for the toast
  duration = duration || 5000;
  box.querySelector(".toast-progress").style.animationDuration = `${
    duration / 1000
  }s`;

  // Remove any existing toast
  let toastAlready = document.body.querySelector(".toast");
  if (toastAlready) {
    toastAlready.remove();
  }

  document.body.appendChild(box);
};

// Function to fetch data from an API
function fetchData(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Check if feature is enabled
function toggleLeftBar() {
  chrome.storage.local.get("featureEnabled", function (data) {
    var featureEnabled = data.featureEnabled || false;
    if (featureEnabled) {
      console.log("enabled");
      // the feature is enabled
      chrome.runtime.sendMessage(
        { action: "getCurrentUrl" },
        async function (response) {
          try {
            loader.classList.replace("hidden", "block");
            const data = await fetchData(
              "https://prospectregistry.com/api/v1/domain/get"
            );
            let lists = data?.domains.map((list) => {
              return list.domain_url;
            });
            if (lists?.includes(response.domain)) {
              loader.classList.replace("block", "hidden");
              showLeftBar("danger");
            } else {
              loader.classList.replace("block", "hidden");
              showLeftBar("success");
            }
          } catch (error) {
            
            loader.style.backgroundColor = "red";
            loader.classList.replace("hidden", "block");
            setTimeout(() => {
              loader.classList.replace("block", "hidden");
            }, 3000);
          }
        }
      );
    } else {
     // the feature is disabled
      removeLeftBar();
    }
  });
}
toggleLeftBar();

// Function to remove the left bar
removeLeftBar = () => {
  let toastElements = document.querySelectorAll(".place-toast-left");
  toastElements.forEach((element) => {
    element.classList.remove("place-toast-left", "toast");
  });
};

// Listen for messages from background scripts
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "domainAddSuccess") {
    showLeftBar("danger");
    showAddingToast("Domain stored in the database", "success", 5000);
  } else if (message.action === "domainAddError") {
    showAddingToast("Error adding domain", "danger", 5000);
  } else if (message.action === "toggleLeftBar") {
    toggleLeftBar();
    console.log("toggleleftbar");
  }
});
