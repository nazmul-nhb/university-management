import type { Request, Response, NextFunction } from 'express';
import { studentServices } from './student.services';
import type {
	StudentResponse,
	GetAllStudents,
	IStudent,
} from './student.interfaces';
import type { ObjectId } from 'mongoose';
import studentValidationSchema from './student.validation';

/**
 *
 * Create a new student
 */
const createStudent = async (
	req: Request<{}, {}, IStudent>,
	res: Response<StudentResponse>,
	next: NextFunction,
): Promise<Response<StudentResponse> | void> => {
	try {
		const student = req.body;

		const parsedStudent = studentValidationSchema.parse(student);

		const result = await studentServices.createStudentIntoDB(parsedStudent);

		if (result) {
			return res.status(201).json({
				success: true,
				message: `Successfully Created New Student!`,
				data: result,
			});
		}
	} catch (error) {
		next(error);
	}
};

/**
 *
 * @returns Returns all student data from the DB
 */
const getAllStudents = async (
	_req: Request,
	res: Response<GetAllStudents>,
	next: NextFunction,
): Promise<Response<GetAllStudents> | void> => {
	try {
		const students = await studentServices.getAllStudentsFromDB();

		return res.status(200).json({
			success: true,
			message: `Successfully Retrieved Student Data!`,
			data: students,
		});
	} catch (error) {
		next(error);
	}
};

/**
 *
 * Get a single student's data for given id
 */
const getSingleStudent = async (
	req: Request<{ id: ObjectId }>,
	res: Response<StudentResponse>,
	next: NextFunction,
): Promise<Response<StudentResponse> | void> => {
	try {
		const { id } = req.params;

		const student = await studentServices.getSingleStudentFromDB(id);

		if (student) {
			return res.status(200).json({
				success: true,
				message: `Successfully Retrieved Student Data!`,
				data: student,
			});
		} else {
			throw new Error('No Student Found with Provided ID!');
		}
	} catch (error) {
		next(error);
	}
};

/**
 * Delete a student by student ID
 */
const deleteStudent = async (
	req: Request<{ id: string }>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;

		const result = await studentServices.deleteStudentFromDB(id);

		res.status(200).json({
			success: true,
			message: 'Student is Deleted Successfully!',
			data: result,
		});
	} catch (error) {
		console.error(error);
		next(error);
	}
};

export const studentControllers = {
	createStudent,
	getAllStudents,
	getSingleStudent,
	deleteStudent,
};
