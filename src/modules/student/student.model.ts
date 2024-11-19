import { Schema, model } from 'mongoose';

import type {
	IGuardian,
	ILocalGuardian,
	IStudent,
	IStudentMethods,
	TStudentModel,
	IUserName,
} from './student.interfaces';
import mongooseUniqueValidator from 'mongoose-unique-validator';

const userNameSchema = new Schema<IUserName>({
	firstName: {
		type: String,
		required: [true, 'First Name is Required!'],
		trim: true,
		maxlength: [20, 'First name cannot be more than 20 characters'],
	},
	middleName: {
		type: String,
	},
	lastName: {
		type: String,
		required: [true, 'Last Name is Required!'],
		maxlength: [20, 'Last name cannot be more than 20 characters'],
	},
});

const guardianSchema = new Schema<IGuardian>({
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

const localGuardianSchema = new Schema<ILocalGuardian>({
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

const studentSchema = new Schema<IStudent, TStudentModel, IStudentMethods>({
	id: { type: String, required: [true, 'ID is required'], unique: true },
	name: { type: userNameSchema, required: [true, 'Name is required!'] },
	gender: {
		type: String,
		enum: {
			values: ['male', 'female', 'other'],
			message: '{VALUE} is not a valid gender!',
		},
		required: [true, 'Gender is Required!'],
	},
	dateOfBirth: { type: String },
	email: {
		type: String,
		required: [true, 'Email is Required!'],
		unique: true,
	},
	contactNo: { type: String, required: [true, 'Contact No. is Required!'] },
	emergencyContactNo: { type: String, required: true },
	bloodGroup: {
		type: String,
		enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
	},
	presentAddress: {
		type: String,
		required: [true, 'Present Address is Required!'],
	},
	permanentAddress: {
		type: String,
		required: [true, 'Permanent Address is Required!'],
	},
	guardian: {
		type: guardianSchema,
		required: [true, 'Guardian is Required!'],
	},
	localGuardian: {
		type: localGuardianSchema,
		required: [true, 'Local Guardian is Required!'],
	},
	profileImg: { type: String },
	status: {
		type: String,
		enum: ['active', 'blocked'],
		default: 'active',
	},
});

// Custom instance method
studentSchema.methods.doesStudentExist = async function () {
	const existingUser = await Student.findOne({ contactNo: this.contactNo });
	
	return existingUser;
};

// studentSchema.method('doesStudentExist', async function () {
// 	const existingUser = await Student.findOne({ contactNo: this.contactNo });

// 	return existingUser;
// });

studentSchema.plugin(mongooseUniqueValidator, {
	message: "'{VALUE}' is already taken!",
});

export const Student = model<IStudent, TStudentModel>('Student', studentSchema);
