// Create a link element for Bootstrap CSS file
var bootstrapLink = document.createElement("link");
bootstrapLink.rel = "stylesheet";
bootstrapLink.href =
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"; // Bootstrap 5 CDN URL

// Append the link element to the head of the document
document.head.appendChild(bootstrapLink);
// Create a container for the toast
var toastContainer = document.createElement("div");

toastContainer.style.zIndex = "100"; // Set the z-index

// Create the toast element
var toast = document.createElement("div");
toast.id = "liveToast";
toast.classList.add("toast", "hide");
toast.setAttribute("role", "alert");
toast.setAttribute("aria-live", "assertive");
toast.setAttribute("aria-atomic", "true");

// Create the toast header
var toastHeader = document.createElement("div");
toastHeader.classList.add("toast-header");

var toastImg = document.createElement("img");
toastImg.src = "./icon.png"; // Add image source
toastImg.classList.add("rounded", "me-2");
toastImg.alt = "icon";

var toastStrong = document.createElement("strong");
toastStrong.classList.add("me-auto");
toastStrong.textContent = "Notfication from mailsniplet";

var toastSmall = document.createElement("small");
toastSmall.textContent = "mailsniplet.com";

var toastCloseBtn = document.createElement("button");
toastCloseBtn.type = "button";
toastCloseBtn.classList.add("btn-close");
toastCloseBtn.setAttribute("data-bs-dismiss", "toast");
toastCloseBtn.setAttribute("aria-label", "Close");

// Create the toast body
var toastBody = document.createElement("div");
toastBody.classList.add("toast-body");
toastBody.textContent = "";
toastBody.style.color = "white";
// Construct the toast header
toastHeader.appendChild(toastImg);
toastHeader.appendChild(toastStrong);
toastHeader.appendChild(toastSmall);
toastHeader.appendChild(toastCloseBtn);

// Append the toast header and body to the toast element
toast.appendChild(toastHeader);
toast.appendChild(toastBody);

toastContainer.appendChild(toast);
document.body.appendChild(toastContainer);








function hide() {
  console.log("hello hide");
  toast.classList.replace("show", "hide");
}

var myDiv = document.querySelector("div");
const list = [
  "www.benhams.com",
  "www.grange.london",
  "www.realestates-wsp.co.uk",
  "www.hudsonsproperty.com",
  "www.danielcobb.co.uk",
];

chrome.storage.local.get("featureEnabled", function (data) {
  var featureEnabled = data.featureEnabled || false;

  if (featureEnabled) {
    console.log("enabled");
    toastContainer.classList.add(
  "position-fixed",
  "top-0",
  "end-0",
  "p-3",
  "bg-primary"
);
    chrome.runtime.sendMessage(
      { action: "getCurrentUrl" },
      function (response) {
        console.log("Current domain:", response.domain);
        if (list.includes(response.domain)) {
          
          console.log("yay found");
          toastBody.style.backgroundColor = "green"
          
          toastBody.textContent = `You have visited this domain: ${response.domain} before`;
          toast.classList.replace("hide", "show");

          setTimeout(hide, 8000);
        } else {
          console.log("sad not found");
           toastBody.style.backgroundColor = "red"

          toastBody.textContent = `You have not visited this domain: ${response.domain} before`;
          toast.classList.replace("hide", "show");

          setTimeout(hide, 8000);
        }
      }
    );
  } else {
    console.log("disabled");
  }
});
