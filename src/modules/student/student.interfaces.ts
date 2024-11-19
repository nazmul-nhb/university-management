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
}

export type TStudentDocument = IStudent & Document;

export interface IStudentMethods {
	doesStudentExist(): Promise<TStudentDocument | null>;
}

export type TStudentModel = Model<
	IStudent,
	Record<string, never>,
	IStudentMethods
>;

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
