import { ZodError } from 'zod';
import type { ErrorWithStatus, MongoError } from '../types/interfaces';

/**
 *
 * @param error Accepts an error of unknown type
 * @returns Returns error message as string
 */
const processErrorMsgs = (error: unknown): string => {
	// Handle Zod validation errors
	if (error instanceof ZodError) {
		return error.errors
			.map((err) => {
				if (err.code === 'invalid_type') {
					return `Expected ${err.expected} for ${err.path} but got ${err.received}!`;
				}
				return `${err.path.join('.')}: ${err.message}`;
			})
			.join('; ');
	} else if (
		'code' in (error as MongoError) &&
		(error as MongoError).code === 11000
	) {
		const mongoError = error as MongoError;
		const path = Object.keys(mongoError.keyValue)[0];

		return `Duplicate ${path} Found for ${mongoError.keyValue[path]}!`;
	} else {
		const generalError = error as ErrorWithStatus;
		return generalError.message;
	}
};

export default {
	processErrorMsgs,
};
