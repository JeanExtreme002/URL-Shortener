import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RedirectComponent from './RedirectComponent';

import Button from './Button';
import Entry from './Entry';

import './App.css';

function AppComponent() {
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
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<AppComponent/>}/>
        <Route path="/s/:id" element={<RedirectComponent/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
