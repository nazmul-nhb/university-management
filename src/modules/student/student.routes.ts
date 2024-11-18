import express from 'express';
import { studentControllers } from './student.controllers';

const router = express.Router();

router.post('/create', studentControllers.createStudent);
router.get('/all', studentControllers.getAllStudents);

export const StudentRoutes = router;
