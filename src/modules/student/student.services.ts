import { ObjectId } from 'mongoose';
import type { IStudent, TStudentDocument } from './student.interfaces';
import { Student } from './student.model';

/**
 *
 * @param student Accept a student object
 * @returns Returns saved student from MongoDB
 */
const createStudentIntoDB = async (
	studentData: IStudent,
): Promise<TStudentDocument> => {
	// Use custom static method
	const studentExists = await Student.doesStudentExist(studentData.contactNo);

	if (studentExists) {
		throw new Error('Student with this contact number already exists!');
	}

	// built-in static method
	const result = await Student.create(studentData);

	// create an instance
	// const student = new Student(studentData);

	// const studentExists = await student.doesStudentExist()

	// if (studentExists) {
	// 	throw new Error('Student with this contact number already exists!');
	// }

	// built-in instance method
	// const result = await student.save();

	return result;
};

/**
 *
 * @returns Returns all student data from the DB
 */
const getAllStudentsFromDB = async (): Promise<TStudentDocument[]> => {
	const result = await Student.find({});
	return result;
};

/**
 *
 * @param id Accepts MongoDB ObjectId
 * @returns Returns matched student data from MongoDB or nothing
 */
const getSingleStudentFromDB = async (
	id: ObjectId,
): Promise<TStudentDocument | null> => {
	const result = await Student.findById(id);
	return result;
};

export const studentServices = {
	createStudentIntoDB,
	getAllStudentsFromDB,
	getSingleStudentFromDB,
};
