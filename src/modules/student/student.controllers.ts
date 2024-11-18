import type { Request, Response, NextFunction } from 'express';
import { studentServices } from './student.services';
import { StudentResponse, GetAllStudents, Student } from './student.interfaces';
import { ObjectId } from 'mongoose';

/**
 *
 * Create a new student
 */
const createStudent = async (
	req: Request<{}, {}, Student>,
	res: Response<StudentResponse>,
	next: NextFunction,
): Promise<Response<StudentResponse> | void> => {
	try {
		const student = req.body;

		const result = await studentServices.createStudentIntoDB(student);

		if (result) {
			return res.status(201).send({
				success: true,
				message: `Successfully Created New Student!`,
				data: result,
			});
		}
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);

			return res.status(400).send({
				success: false,
				message: error.message,
			});
		}
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

		return res.status(200).send({
			success: true,
			message: `Successfully Retrieved Student Data!`,
			data: students,
		});
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);

			return res.status(400).send({
				success: false,
				message: error.message,
			});
		}
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
			return res.status(200).send({
				success: true,
				message: `Successfully Retrieved Student Data!`,
				data: student,
			});
		} else {
			throw new Error('No Student Found with Provided ID!');
		}
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);

			return res.status(400).send({
				success: false,
				message: error.message,
			});
		}
		next(error);
	}
};

export const studentControllers = {
	createStudent,
	getAllStudents,
	getSingleStudent,
};
