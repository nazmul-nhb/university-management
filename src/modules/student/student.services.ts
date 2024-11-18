import type { Student, StudentDocument } from "./student.interfaces";
import { StudentModel } from "./student.model";

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

export const studentServices = {
	createStudentIntoDB,
};