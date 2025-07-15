import express from 'express';
const router = express.Router();

import { saveSalonInfo, getSalonInfo, getAllSalonInfos } from '../Controllers/salonRoutes.js';

router.post('/info', saveSalonInfo);
router.get('/info/:adminId', getSalonInfo);
router.get('/allInfo', getAllSalonInfos);

export default router;