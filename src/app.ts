import cors from 'cors';
import express from 'express';
import type { Application, NextFunction, Request, Response } from 'express';
import { ErrorWithStatus } from './types/interfaces';
import { StudentRoutes } from './modules/student/student.routes';
import utilities from './utilities';

const app: Application = express();

app.use(cors());
app.use(express.json());

// Root/Test Route
app.get('/', (_req: Request, res: Response) => {
	res.status(200).json({ success: true, message: '🏃 Server is Running!' });
});

// Application Routes
app.use('/api/students', StudentRoutes);

// Error handler for 404
app.use((req: Request, _res: Response, next: NextFunction) => {
	const error: ErrorWithStatus = new Error(
		'Requested End-Point “' + req.method + req.url + '” Not Found!',
	);

	error.status = 404;

	next(error);
});

// Global Error Handler
app.use((error: unknown, _req: Request, res: Response, next: NextFunction) => {
	const errorMessage = utilities.processErrorMsgs(error);

	console.error('🛑 Error: ' + errorMessage);

	// Delegate to the default Express error handler if the headers have already been sent to the client
	if (res.headersSent) {
		return next(error);
	}

	res.status((error as ErrorWithStatus).status || 500).json({
		success: false,
		message: errorMessage,
	});
});

export default app;
