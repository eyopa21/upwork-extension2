// Create a div element to hold extension-related data
const div = document.createElement('div');
div.setAttribute('id', 'imagelinkmail_ext');
div.setAttribute('data-ext_id', chrome.runtime.id);
document.body.appendChild(div);

// Create a button element for triggering Gmail export (hidden by default)
const button = document.createElement('button');
button.setAttribute('id', 'imagelinkmail_ext_trigger');
button.style.display = 'none';
document.body.appendChild(button);

// Add click event listener to the button for exporting to Gmail
button.addEventListener('click', () => {
    if (button.dataset.element) {
        exportToGmail(button.dataset.element, button.dataset.query); // Call exportToGmail function with specified element and query
    }
});

// Function to export content to Gmail
function exportToGmail(element, query) {
    const el = document.querySelector(element);
    if (el) {
        // Save inner HTML of the element to local storage
        chrome.storage.local.set({ template: el.innerHTML }, () => {
            // Open a new Gmail draft
           window.open('https://mail.google.com/mail/u/0/#drafts?compose=new','_blank');
        });
    } else {
        // If element not found and URL matches the query, show an alert
        if (window.location.href.includes(query)) {
            alert('Element not found');
        }
    }
}

// Check if current URL is Gmail's new draft compose page
if (window.location.href === 'https://mail.google.com/mail/u/0/#drafts?compose=new') {
    // Retrieve template from local storage
    chrome.storage.local.get(['template']).then(result => {
        const template = result.template;
        if (template) {
            // Wait for '.editable' element to be available, then insert template content
            waitForKeyElements('.editable', insertTemplate);
            function insertTemplate() {
                const draft = document.querySelector('.editable');
                if (draft) {
                    draft.innerHTML = template;
                    // Remove template from local storage after insertion
                    chrome.storage.local.remove(['template']);
                }
            }
        }
    });
}
