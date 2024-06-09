import './Entry.css';

function Entry(id) {
    return (
        <input className="Entry" id={id} type="text" placeholder="Insert an URL to a website..." />
    );
  }
  
  export default Entry;
  