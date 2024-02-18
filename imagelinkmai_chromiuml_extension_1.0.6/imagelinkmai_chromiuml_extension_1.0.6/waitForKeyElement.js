/**
 * Wait for key elements to appear on the page and perform an action on them.
 * @param {string} selectorTxt - The selector string for the target elements.
 * @param {function} actionFunction - The function to execute on each target element.
 * @param {string} iframeSelector - Optional: Selector string for the iframe containing the target elements.
 */
function waitForKeyElements(selectorTxt, actionFunction, iframeSelector) {
    let targetNodes, btargetsFound;

    // Check if an iframe selector is provided
    if (typeof iframeSelector === 'undefined') {
        targetNodes = $(selectorTxt); // Select target elements directly
    } else {
        targetNodes = $(iframeSelector).contents().find(selectorTxt); // Select target elements within the iframe
    }

    // Check if target nodes are found
    if (targetNodes && targetNodes.length > 0) {
        btargetsFound = true;

        // Iterate over each target node
        targetNodes.each(function () {
            const jThis = $(this);
            const alreadyFound = jThis.data('alreadyFound') || false;

            // If not already found, execute action function on the node
            if (!alreadyFound) {
                const cancelFound = actionFunction(jThis);
                if (cancelFound) {
                    btargetsFound = false; // Set flag if action function returns true
                } else {
                    jThis.data('alreadyFound', true); // Mark node as already found
                }
            }
        });
    } else {
        btargetsFound = false;
    }

    // Set up control object for tracking element detection intervals
    const controlObj = waitForKeyElements.controlObj || {};
    const controlKey = selectorTxt.replace(/[^\w]/g, '_');
    let timeControl = controlObj[controlKey];

    // Clear interval and remove control key if all targets found
    if (btargetsFound && timeControl) {
        clearInterval(timeControl);
        delete controlObj[controlKey];
    } else {
        // Set interval to keep checking for elements
        if (!timeControl) {
            timeControl = setInterval(function () {
                waitForKeyElements(selectorTxt, actionFunction, iframeSelector);
            }, 300); // Adjust interval as needed
            controlObj[controlKey] = timeControl; // Store control key and interval
        }
    }
    waitForKeyElements.controlObj = controlObj; // Update global control object
}
