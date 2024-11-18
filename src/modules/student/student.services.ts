import { ObjectId } from 'mongoose';
import type { Student, StudentDocument } from './student.interfaces';
import { StudentModel } from './student.model';

/**
 *
 * @param student Accept a student object
 * @returns Returns saved student from MongoDB
 */
const createStudentIntoDB = async (
	student: Student,
): Promise<StudentDocument> => {
	const result = await StudentModel.create(student);
	return result;
};

/**
 *
 * @returns Returns all student data from the DB
 */
const getAllStudentsFromDB = async (): Promise<StudentDocument[]> => {
	const result = await StudentModel.find({});
	return result;
};

/**
 *
 * @param id Accepts MongoDB ObjectId
 * @returns Returns matched student data from MongoDB or nothing
 */
const getSingleStudentFromDB = async (
	id: ObjectId,
): Promise<StudentDocument | null> => {
	const result = await StudentModel.findById(id);
	return result;
};

export const studentServices = {
	createStudentIntoDB,
	getAllStudentsFromDB,
	getSingleStudentFromDB,
};
