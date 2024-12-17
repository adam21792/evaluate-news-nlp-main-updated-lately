// urlChecker.js
function checkForURL(inputURL) {
    const regex = new RegExp('^(https?:\\/\\/)?' + // Protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // Domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // Port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // Query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // Fragment locator
    return regex.test(inputURL);
}

export { checkForURL };

export const checkName = (input) => {
    const regex = /^[a-zA-Z ]+$/;
    return regex.test(input);
};

export const validateInput = (inputText) => {
    if (!inputText) {
        alert('Error: Input cannot be blank!');
        return false;
    }

    const urlPattern = new RegExp('^(https?:\\/\\/)?' + // Protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // Domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // Port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // Query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // Fragment locator

    if (!urlPattern.test(inputText)) {
        alert('Error: Please enter a valid URL!');
        return false;
    }

    return true;
};
