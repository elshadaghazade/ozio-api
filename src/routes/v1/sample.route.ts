import { sampleHomeController } from '@/controllers/v1/sample.controller';
import express from 'express';

const router = express.Router();

router.get('/', sampleHomeController);

export default router;