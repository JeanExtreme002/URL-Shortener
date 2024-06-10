import request from 'supertest';
import app from '../app';

import session from './mockedDatabase';
import {initialize} from '../shortener/session';

const url = 'http://sample.com';
let shortenedUrlId: string | null = null;

describe('Shortener', () => {
    describe('Initialize Database Models', () => {
        test('authenticate and synchronize session', async () => {
            await initialize(session, () => {}, true);
        });
    });

    describe('Route for Shorterning an URL - POST /', () => {
        test('should shorten the URL', async () => {
            const res = await request(app)
                .post('/shorten')
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send({url: url});

            expect(res.body.id).toBeDefined();
            shortenedUrlId = res.body.id;
        });

        test('should shorten the same URL, getting the same ID', async () => {
            const res = await request(app)
                .post('/shorten')
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send({url: url});

            expect(res.body.id).toBeDefined();
            expect(res.body.id).toEqual(shortenedUrlId);
        });

        test('should receive 400 status code for sending request without URL', async () => {
            const res = await request(app)
                .post('/shorten')
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');

            expect(res.status).toEqual(400);
        });
    });

    describe('Route for Recovering an URL - GET /', () => {
        test('should recover the original URL', async () => {
            const res = await request(app).get('/' + shortenedUrlId);

            expect(res.body.url).toBeDefined();
            expect(res.body.url).toEqual(url);
        });

        test('should receive 404 status code for searching for a non existing URL', async () => {
            const res = await request(app).get('/' + shortenedUrlId + 'error');

            expect(res.status).toEqual(404);
        });
    });
});
