import mongoose from 'mongoose';
import configs from './configs';
import app from './app';

const bootStrap = async () => {
	try {
		if (!configs.mongoUri) {
			throw new Error('MongoDB URI is Not Defined!');
		}

		await mongoose.connect(configs.mongoUri);

		console.log('🟢 MongoDB is Connected!');

		// Listen for established connection
		mongoose.connection.on('connected', () => {
			console.log('🟢 MongoDB is Connected!');
		});

		// Listen for connection errors
		mongoose.connection.on('error', (err) => {
			console.error('🛑 MongoDB Connection Error: ', err.message);
		});

		// Optional: Listen for disconnection
		mongoose.connection.on('disconnected', () => {
			console.error('🔴 MongoDB is Disconnected!');
		});

		app.listen(configs.port, () => {
			console.log('🟢 Server is Listening on Port: ', configs.port);
		});
	} catch (error) {
		if (error instanceof Error) {
			console.error('🚫 MongoDB Connection Failed: ', error.message);
		} else {
			console.error('🛑 Unknown Error Occurred!');
		}
		console.error(error);
	}
};

bootStrap();
