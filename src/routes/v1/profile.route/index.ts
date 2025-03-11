import express from 'express';
import addressRoutes from './address.route';
import meRoutes from './me.route';

const router = express.Router();

router.use('/address', addressRoutes);
router.use('/me', meRoutes);

export default router;