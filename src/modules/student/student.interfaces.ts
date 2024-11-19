import { Document, Model } from 'mongoose';

export interface IUserName {
	firstName: string;
	middleName?: string;
	lastName: string;
}

export interface IGuardian {
	fatherName: string;
	fatherOccupation: string;
	fatherContactNo: string;
	motherName: string;
	motherOccupation: string;
	motherContactNo: string;
}

export interface ILocalGuardian {
	name: string;
	occupation: string;
	contactNo: string;
	address: string;
}

export interface IStudent {
	id: string;
	name: IUserName;
	password: string;
	gender: 'male' | 'female' | 'other';
	dateOfBirth?: string;
	email: string;
	contactNo: string;
	emergencyContactNo: string;
	bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
	presentAddress: string;
	permanentAddress: string;
	guardian: IGuardian;
	localGuardian: ILocalGuardian;
	profileImg?: string;
	status: 'active' | 'blocked';
	isDeletedStudent: boolean;
}

export type TStudentDocument = IStudent & Document;

// Types for instance method
// export interface IStudentMethods {
// 	doesStudentExist(): Promise<TStudentDocument | null>;
// }

// export type TStudentModel = Model<
// 	IStudent,
// 	Record<string, never>,
// 	IStudentMethods
// >;

// Type for static method
export interface IStudentModel extends Model<IStudent> {
	// eslint-disable-next-line no-unused-vars
	doesStudentExist(contactNo: string): Promise<TStudentDocument | null>;
}

export interface StudentResponse {
	success: boolean;
	message: string;
	data?: TStudentDocument;
}

export interface GetAllStudents {
	success: boolean;
	message: string;
	data?: TStudentDocument[];
}
