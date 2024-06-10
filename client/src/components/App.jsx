import React from 'react';
import {useState} from 'react';

import PropTypes from 'prop-types';

import Alert from '@mui/material/Alert';
import Fade from '@mui/material/Fade';

import Button from './Button';
import Entry from './Entry';

import './App.css';

function App(props) {
    const [endAlert, setAlert] = useState(false);
    const exitAlertTimeout = 1000;

    if (props.urlNotFoundError) {
        setTimeout(() => {
            setAlert(true);

            setTimeout(() => {
                document.getElementById('notFoundAlert').hidden = true;
            }, exitAlertTimeout + 1000);
        }, 5000);
    }

    return (
        <div className='App'>
            {props.urlNotFoundError && (
                <div id='notFoundAlert'>
                    <Fade timeout={{enter: 0, exit: exitAlertTimeout}} in={!endAlert}>
                        <Alert severity='error'>Shortened URL was not found.</Alert>
                    </Fade>
                </div>
            )}

            <div id='alertBox' hidden>
                <Alert id='alert' severity='error'>
                    Something went wrong... Please, try again.
                </Alert>
            </div>

            <header className='App-header'>
                <img src='./logo.png' className='App-logo' alt='logo' />
                <p>Shorten your lengthy URL into a compact and convenient link here :3</p>
            </header>

            <Entry entryId='url-entry' />
            <br />
            <Button entryId='url-entry' />
        </div>
    );
}

App.propTypes = {
    urlNotFoundError: PropTypes.bool,
};

export default App;
