const powerButton = document.getElementById('powerButton');
const addButton = document.getElementById('addButton');
powerButton.addEventListener('click', function() {
    this.classList.toggle('power-on');
    chrome.storage?.local.get('featureEnabled', function(data) {
            var featureEnabled = data.featureEnabled || false;
            chrome.storage.local.set({ 'featureEnabled': !featureEnabled });
    }); 
});

const RegisterDomain = (domain) => {
    document.getElementById('spinner').classList.replace('hidden', 'block');
     document.getElementById('button-text').classList.replace('block', 'hidden');
const url = "https://prospectregistry.com/api/v1/domain/add";
      const data = {
        domain_url: domain,
      };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      fetch(url, options)
        .then((data) => {
            console.log("Success:", data);
             document.getElementById('spinner').classList.replace('block', 'hidden');
            document.getElementById('button-text').classList.replace('hidden', 'block');
            document.getElementById('message').classList.replace('text-black', 'text-green-500');
            document.getElementById('message').classList.replace('hidden', 'flex');
              document.getElementById('message').textContent = 'Domain added successfully '
            setTimeout(() => {
                document.getElementById('message').classList.replace('flex', 'hidden');
            }, 5000)
        })
        .catch((error) => {
            console.error("Error:", error);
             document.getElementById('spinner').classList.replace('block', 'hidden');
            document.getElementById('button-text').classList.replace('hidden', 'block');
            document.getElementById('message').classList.replace('text-black', 'text-red-500');
            document.getElementById('message').classList.replace('hidden', 'flex');
             document.getElementById('message').textContent = 'Domain adding not sucessfull'
             setTimeout(() => {
                document.getElementById('message').classList.replace('flex', 'hidden');
            }, 5000)
        });
}



chrome.runtime.sendMessage({ action: "getCurrentUrl" }, function (response) {
    if (chrome.runtime.lastError) {
        console.error("Errorrrrrrrr:", chrome.runtime.lastError.message);
    } else {
        addButton.addEventListener('click', function() {
            console.log("add to DB", response.domain)
            RegisterDomain(response.domain)
        })
    }
});


   
chrome.storage?.local.get('featureEnabled', function(data) {
    var featureEnabled = data.featureEnabled || false;
    if (featureEnabled) {
        console.log("enabled")
        powerButton.classList.toggle('power-on');
    } else {
        console.log("disabled")
       
    }
});

