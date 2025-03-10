import express from 'express';
import addressRoute from './address.route';

const router = express.Router();

router.use('/address', addressRoute);

export default router;