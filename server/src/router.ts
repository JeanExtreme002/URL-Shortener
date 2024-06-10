import {Router, Request, Response} from 'express';
import shortener from './shortener';

function index(req: Request, res: Response) {
    res.sendStatus(200);
}

function recoverUrl(req: Request, res: Response) {
    console.log('>>>>>>', req.params);
    shortener.get(req.params.id, res).catch(() => {
        res.sendStatus(400);
    });
}

function shortenUrl(req: Request, res: Response) {
    console.log('>>>>>>', req.body);
    shortener.insert(req.body.url, res).catch(() => {
        res.sendStatus(400);
    });
}

// Define paths.
const router = Router();

router.get('/', index);
router.get('/:id', recoverUrl);
router.post('/shorten', shortenUrl);

export {router, index, recoverUrl, shortenUrl};
