import type { Request, Response, NextFunction } from 'express';
import { studentServices } from './student.services';
import { CreationResponse, Student } from './student.interfaces';

const createStudent = async (
	req: Request<{}, {}, Student>,
	res: Response<CreationResponse>,
	next: NextFunction,
): Promise<Response<CreationResponse> | void> => {
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

export const studentControllers = {
	createStudent,
};
