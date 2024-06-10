import {getShortenerUrl, getFullShortenedUrl, validateURL} from './urls';

let shortening = false;

function shortenURL(entryId) {
    // The function can be called only once.
    if (shortening) {
        return;
    }
    shortening = true;

    // Hide the previous alert.
    document.getElementById('alertBox').hidden = true;

    // Get the URL from the input and check if it is a valid URL.
    const entry = document.getElementById(entryId);
    const url = entry.value;

    if (!validateURL(url)) {
        entry.value = 'Insert a valid URL.';
        shortening = false;
        return;
    }

    if (url.length > 200) {
        entry.value = 'Maximum limit of 200 characters exceeded.';
        shortening = false;
        return;
    }
    entry.disabled = true;

    // Informs that the application is shortening the URL.
    const button = document.getElementById('shortenerButton');
    const originalButtonText = button.innerText;
    button.innerText = 'Shortening ...';

    // Get the server URL and create the request.
    const serverUrl = getShortenerUrl();

    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({url: url}),
    };

    // Send the URL to the server for shortening it.
    fetch(serverUrl, options)
        .then((response) => {
            response.json().then((body) => {
                document.getElementById(entryId).value = getFullShortenedUrl(body.id);
            });
        })
        .catch(() => {
            document.getElementById('alertBox').hidden = false;
        })
        .finally(() => {
            button.innerText = originalButtonText;

            shortening = false;
            entry.disabled = false;
        });
}

export default shortenURL;
