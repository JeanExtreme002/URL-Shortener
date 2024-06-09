import shortenURL from '../services/shorten';

import './Entry.css';

function Entry(props) {
    const onKeyUp = (event) => {
        if (event.key.toUpperCase() === "ENTER") {
            shortenURL(props.entryId);
        }
    }

    return (
        <input onKeyUp={onKeyUp} className="Entry" id={props.entryId} type="text" placeholder="Insert an URL to a website..." autoFocus/>
    );
  }
  
  export default Entry;
  