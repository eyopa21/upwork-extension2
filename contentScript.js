

var styleElement = document.createElement('style');


var keyframes = `
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
    }
`;


styleElement.innerHTML = keyframes;


document.head.appendChild(styleElement);


var GFont = document.createElement("link");
GFont.rel = "stylesheet";
GFont.href =
  "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"; 
document.head.appendChild(GFont);




var toastContainer = document.createElement("div");

toastContainer.style.zIndex = "100"; 


var toast = document.createElement("div");
toastContainer.id = "toast-overlay";
toastContainer.classList.add("toast-overlay");



document.body.appendChild(toastContainer);





  
let icon = { 

    success: 

    '<span class="material-symbols-outlined">task_alt</span>', 

    danger: 

    '<span class="material-symbols-outlined">error</span>', 

    warning: 

    '<span class="material-symbols-outlined">warning</span>', 

    info: 

    '<span class="material-symbols-outlined">info</span>', 
}; 

  
const showToast = ( 

    message = "Sample Message", 

    toastType = "info", 

    duration = 5000) => { 

    if ( 

        !Object.keys(icon).includes(toastType)) 

        toastType = "info"; 

  

    let box = document.createElement("div"); 

  //box.classList.add( "toast", `toast-${toastType}`);
  
  box.style.cssText = ' position: fixed; top: 25px; right: 25 max-width: 300px; background: #fff; padding: 0.5rem; border-radius: 4px; box-shadow: -1px 1px 10px rgba(0, 0, 0, 0.3); z-index: 1023; animation: slideInRight 0.3s ease-in-out forwards, fadeOut 0.5s ease-in-out forwards 3s; transform: translateX(110%);'

    box.innerHTML = ` <div class="toast-content-wrapper" style="background-color: #95eab8; display: flex; justify-content: space-between; align-items: center;"> 

                      <div class="toast-icon" style=" padding: 0.35rem 0.5rem; font-size: 1.5rem;"> 

                      ${icon[toastType]} 

                      </div> 

                      <div class="toast-message" style="flex: 1; font-size: 0.9rem; color: #000000; padding: 0.5rem;">${message}</div> 

                      <div class="toast-progress" style="position: absolute; display: block; bottom: 0; left: 0; height: 4px; width: 100%; background: #b7b7b7; animation: toastProgress 3s ease-in-out forwards;"></div> 

                      </div>`; 

    duration = duration || 5000; 

    box.querySelector(".toast-progress").style.animationDuration = 

            `${duration / 1000}s`; 

  

    let toastAlready =  

        document.body.querySelector(".toast"); 

    if (toastAlready) { 

        toastAlready.remove(); 

    } 

  

  document.body.appendChild(box)

}; 
  


 


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
         
        } else {
         showToast("Article Submitted Successfully","success",5000); 
        }
      }
    );
  } else {
    console.log("disabled");
  }
});
