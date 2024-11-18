import express from 'express';
import { studentControllers } from './student.controllers';

const router = express.Router();

router.post('/create', studentControllers.createStudent);
router.get('/', studentControllers.getAllStudents);
router.get('/:id', studentControllers.getSingleStudent);

export const StudentRoutes = router;
