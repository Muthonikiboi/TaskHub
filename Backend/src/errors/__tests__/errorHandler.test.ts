import { notFoundHandler, errorHandler } from "../errorHandler";
import { Request, Response, NextFunction } from 'express';

import request from 'supertest';
import app from '../../server';

describe('Error handling middleware', () =>{
    beforeAll(() =>{
        app.use(notFoundHandler);
        app.use(errorHandler);
    });

    it('handling 404 not found errors', async () =>{
        const response = await request(app).get('/egerrgggrg')
        expect(response.status).toBe(404);
        console.log(response.body)
    })

    it('handling 500 Internal server error', async () => {
        app.get('/error-route', (req, res, next) =>{
            throw new Error('This route will throw an error');
        })

        const response = await request(app).get('/error-route')
        expect(response.status).toBe(500)
    })
})