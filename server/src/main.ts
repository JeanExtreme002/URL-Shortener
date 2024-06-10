import app from './app';
import config from './config';

import {initialize, session} from './shortener/session';

function main() {
    app.listen(config.server.port, () =>
        console.log('Server is running on port ' + config.server.port)
    );
}

initialize(session, main, config.devMode);
