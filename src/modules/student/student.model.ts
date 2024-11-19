import { Schema, model } from 'mongoose';

import type {
	Guardian,
	LocalGuardian,
	Student,
	UserName,
} from './student.interfaces';

const userNameSchema = new Schema<UserName>({
	firstName: {
		type: String,
		required: [true, 'First Name is Required!'],
	},
	middleName: {
		type: String,
	},
	lastName: {
		type: String,
		required: [true, 'Last Name is Required!'],
	},
});

const guardianSchema = new Schema<Guardian>({
	fatherName: {
		type: String,
		required: [true, "Father's Name is required!"],
	},
	fatherOccupation: {
		type: String,
		required: [true, "Father's Occupation is Required!"],
	},
	fatherContactNo: {
		type: String,
		required: [true, "Father's Contact No. is Required!"],
	},
	motherName: {
		type: String,
		required: [true, "Mother's Name is Required!"],
	},
	motherOccupation: {
		type: String,
		required: [true, "Mother's Occupation is Required!"],
	},
	motherContactNo: {
		type: String,
		required: [true, "Mother's Contact No. is Required!"],
	},
});

const localGuardianSchema = new Schema<LocalGuardian>({
	name: {
		type: String,
		required: [true, 'Name is Required!'],
	},
	occupation: {
		type: String,
		required: [true, 'Local Guardian Occupation is Required!'],
	},
	contactNo: {
		type: String,
		required: [true, "Local Guardian's Contact No. is Required!"],
	},
	address: {
		type: String,
		required: [true, "Local Guardian's Address is Required!"],
	},
});

const studentSchema = new Schema<Student>({
	id: { type: String, required: true, unique: true },
	name: { type: userNameSchema, required: [true, 'Name is required!'] },
	gender: {
		type: String,
		enum: {
			values: ['male', 'female', 'other'],
			message: '{VALUE} is not a valid gender!',
		},
		required: true,
	},
	dateOfBirth: { type: String },
	email: { type: String, required: true, unique: true },
	contactNo: { type: String, required: true },
	emergencyContactNo: { type: String, required: true },
	bloodGroup: {
		type: String,
		enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
	},
	presentAddress: { type: String, required: true },
	permanentAddress: { type: String, required: true },
	guardian: { type: guardianSchema, required: true },
	localGuardian: { type: localGuardianSchema, required: true },
	profileImg: { type: String },
	status: {
		type: String,
		enum: ['active', 'blocked'],
		default: 'active',
	},
});

export const StudentModel = model<Student>('Student', studentSchema);
