function getBackEndServerUrl() {
    return process.env.REACT_APP_BACKEND_HOST + ":" + process.env.REACT_APP_BACKEND_PORT;
}

function getShortenerUrl() {
    return getBackEndServerUrl() + "/shorten";
}

function getFullShortenedUrl(id) {
    return window.location.origin + "/s/" + id;
}

function validateURL(url) {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
}

export {
    getBackEndServerUrl,
    getShortenerUrl,
    getFullShortenedUrl,
    validateURL
};