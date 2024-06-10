import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import {router} from './router';

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.json());
app.use(router);

export default app;
