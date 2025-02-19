import express from 'express';
import sampleRouter from './sample.router';

const routes = express.Router();

routes.use('/sample', sampleRouter);

export default routes;