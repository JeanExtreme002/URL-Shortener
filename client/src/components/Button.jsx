import shortenURL from '../services/shorten';

import './Button.css';

function ShortenerButton(props) {
    const onClick = () => shortenURL(props.entryId);

    return (
        <button id="shortenerButton" className="Button" onClick={onClick}>Shorten URL!</button>
    );
}

export default ShortenerButton;
