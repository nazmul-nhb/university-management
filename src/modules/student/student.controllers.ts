import type { Request, Response, NextFunction } from 'express';
import { studentServices } from './student.services';
import { CreateStudents, GetAllStudents, Student } from './student.interfaces';

/**
 *
 * Create a new student
 */
const createStudent = async (
	req: Request<{}, {}, Student>,
	res: Response<CreateStudents>,
	next: NextFunction,
): Promise<Response<CreateStudents> | void> => {
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

export const studentControllers = {
	createStudent,
	getAllStudents,
};
