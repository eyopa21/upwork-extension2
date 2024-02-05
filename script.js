const powerButton = document.getElementById('powerButton');

powerButton.addEventListener('click', function() {
    // Toggle the power button's state
    this.classList.toggle('power-on');

    chrome.storage.local.get('featureEnabled', function(data) {
            var featureEnabled = data.featureEnabled || false;
            chrome.storage.local.set({ 'featureEnabled': !featureEnabled });

  console.log("clicked from script js")
    });
 
    
});


   
chrome.storage.local.get('featureEnabled', function(data) {
    var featureEnabled = data.featureEnabled || false;

    if (featureEnabled) {
    
        console.log("enabled")
        powerButton.classList.toggle('power-on');
    } else {
      
        console.log("disabled")
       // powerButton.classList.toggle('power-on');
    }
});

/*
    document.getElementById('toggleFeatureBtn').addEventListener('click', function() {
        
      


        chrome.storage.local.get('featureEnabled', function(data) {
            var featureEnabled = data.featureEnabled || false;
            chrome.storage.local.set({ 'featureEnabled': !featureEnabled });

  console.log("clicked from script js")
        });
    });

    */