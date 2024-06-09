import Button from './Button';
import Entry from './Entry';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="./logo.png" className="App-logo" alt="logo" />
        <p>Shorten your lengthy URL into a compact and convenient link here :3</p>
      </header>

      <Entry id="url-entry"/>
      <br/>
      <Button entryId="url-entry"/>
    </div>
  );
}

export default App;
