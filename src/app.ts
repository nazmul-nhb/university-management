import cors from 'cors';
import express from 'express';
import type { Application, NextFunction, Request, Response } from 'express';
import { ErrorWithStatus } from './types/interfaces';

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
	res.status(200).json({ success: true, message: '🏃 Server is Running!' });
});

// Error handler for 404
app.use((req: Request, _res: Response, next: NextFunction) => {
	const error: ErrorWithStatus = new Error(
		'Requested End-Point “' + req.url + '” Not Found!',
	);

	error.status = 404;

	next(error);
});

// Global Error Handler
app.use(
	(
		error: ErrorWithStatus,
		_req: Request,
		res: Response,
		next: NextFunction,
	) => {
		console.error('🛑 Error: ' + error.message);

		// Delegate to the default Express error handler, when the headers have already been sent to the client
		if (res.headersSent) {
			return next(error);
		}

		res.status(error.status || 500).json({
			success: false,
			message: error.message || 'Internal Server Error!',
		});
	},
);

export default app;
