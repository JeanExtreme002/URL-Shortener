import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import App from './components/App';
import Redirect from './components/Redirect';
import reportWebVitals from './reportWebVitals';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/error' exact element={<App urlNotFoundError={true} />} />
                <Route path='/s/:id' element={<Redirect />} />
                <Route path='*' exact element={<App />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
