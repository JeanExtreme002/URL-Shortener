import './Button.css';

function shortenURL(entryId) {
    const serverUrl = process.env.REACT_APP_BACKEND_HOST + ":" + process.env.REACT_APP_BACKEND_PORT;
    const url = document.getElementById(entryId).value;

    const options = {
        method: "post",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({url: url})
    };
    
    fetch(serverUrl + "/shorten", options).then((response) => {
        if (response.status === 200) {
            response.json().then((body) => {
                document.getElementById(entryId).value = serverUrl + "/" + body.id;
            });
        }
        else {
            document.getElementById(entryId).value = "Something went wrong... Please, try again.";
        }
    });
}

function ShortenerButton(entryId) {
    const onClick = () => shortenURL(entryId);

    return (
        <button className="Button" onClick={onClick}>Shorten URL!</button>
    );
}

export default ShortenerButton;
