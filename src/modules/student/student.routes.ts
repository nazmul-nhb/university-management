import express from 'express';
import { studentControllers } from './student.controllers';

const router = express.Router();

router.post('/create', studentControllers.createStudent);

export const StudentRoutes = router;
