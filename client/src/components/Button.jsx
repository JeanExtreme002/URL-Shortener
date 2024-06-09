import './Button.css';

let shortening = false;

function validateURL(url) {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
}

function shortenURL(entryId) {
    if (shortening) {
        return;
    }
    shortening = true;

    const entry = document.getElementById(entryId);
    const url = entry.value;

    if (!validateURL(url)) {
        entry.value = "Insert a valid URL."
        shortening = false;
        return;
    }
    entry.disabled = true;

    const serverUrl = process.env.REACT_APP_BACKEND_HOST + ":" + process.env.REACT_APP_BACKEND_PORT;

    const options = {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({url: url})
    };
    
    fetch(serverUrl + "/shorten", options).then((response) => {
        response.json().then((body) => {
            document.getElementById(entryId).value = window.location.href + "/url/" + body.id;
        });

    }).catch(() => {
        entry.value = "Something went wrong... Please, try again.";

    }).finally(() => {
        shortening = false;
        entry.disabled = false;
    });
}

function ShortenerButton(entryId) {
    const onClick = () => shortenURL(entryId);

    return (
        <button className="Button" onClick={onClick}>Shorten URL!</button>
    );
}

export default ShortenerButton;
