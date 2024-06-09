import {Router, Request, Response} from 'express';
import shortener from './shortener';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.json({message: 'OK'});
});

router.get('/:id', (req: Request, res: Response) => {
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

router.post('/shorten', (req: Request, res: Response) => {
    shortener
        .insert(req.body.url)
        .then((id: string) => {
            res.json({id: id});
        })
        .catch(() => {
            res.sendStatus(400);
        });
});

export default router;
