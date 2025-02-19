import { Router } from 'express';
import { sampleHomeController } from '../../controllers/v1/sample.controller';

const router = Router();

router.get('/', sampleHomeController);

export default router;