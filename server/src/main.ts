import {Router, Request, Response} from 'express';
import express from 'express';
import bodyParser from 'body-parser';

import config from './config';
import shortener from './shortener';

const app = express();
const route = Router();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.json());
app.use(route);

route.get('/', (req: Request, res: Response) => {
    res.json({message: 'OK'});
});

route.get('/:id', (req: Request, res: Response) => {
    shortener
        .get(req.params.id)
        .then((url: string | null) => {
            if (url) {
                res.json({url: url});
            } else {
                res.sendStatus(404);
            }
        })
        .catch(() => {
            res.sendStatus(404);
        });
});

route.post('/shorten', (req: Request, res: Response) => {
    shortener
        .insert(req.body.url)
        .then((id: string) => {
            res.json({id: id});
        })
        .catch(() => {
            res.sendStatus(400);
        });
});

app.listen(
    config.server.port || 5000,
    () => 'Server is running on port ' + config.server.port
);
