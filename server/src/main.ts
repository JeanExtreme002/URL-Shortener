import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import config from './config';
import router from './router';
import {initialize} from './shortener/session';

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.json());
app.use(router);

function main() {
    app.listen(config.server.port, () =>
        console.log('Server is running on port ' + config.server.port)
    );
}

initialize(main, process.argv[2] === 'dev');
