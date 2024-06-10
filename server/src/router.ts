import {Router, Request, Response} from 'express';
import shortener from './shortener';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.json({message: 'OK'});
});

router.get('/:id', (req: Request, res: Response) => {
    shortener.get(req.params.id, res).catch(() => {
        res.sendStatus(400);
    });
});

router.post('/shorten', (req: Request, res: Response) => {
    shortener.insert(req.body.url, res).catch(() => {
        res.sendStatus(400);
    });
});

export default router;
