import { z } from 'zod';

const userNameSchema = z.object({
	firstName: z
		.string()
		.min(1)
		.max(20)
		.refine((value) => /^[A-Z]/.test(value), {
			message: 'First Name must start with a capital letter',
		}),
	middleName: z.string().optional(),
	lastName: z.string(),
});

const guardianSchema = z.object({
	fatherName: z.string(),
	fatherOccupation: z.string(),
	fatherContactNo: z.string(),
	motherName: z.string(),
	motherOccupation: z.string(),
	motherContactNo: z.string(),
});

const localGuardianSchema = z.object({
	name: z.string(),
	occupation: z.string(),
	contactNo: z.string(),
	address: z.string(),
});

export const studentValidationSchema = z.object({
	id: z.string({ message: 'Yo Man, ID is Required!' }).min(6),
	password: z.string({ message: 'Password is Required!' }).max(20),
	name: userNameSchema,
	gender: z.enum(['male', 'female', 'other']),
	dateOfBirth: z.string().optional(),
	email: z.string().email(),
	contactNo: z.string(),
	emergencyContactNo: z.string(),
	bloodGroup: z
		.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
		.optional(),
	presentAddress: z.string(),
	permanentAddress: z.string(),
	guardian: guardianSchema,
	localGuardian: localGuardianSchema,
	profileImg: z.string(),
	status: z.enum(['active', 'blocked']).default('active'),
	isDeletedStudent: z.boolean().default(false),
});

export default studentValidationSchema;
