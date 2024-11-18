import app from './app';
import configs from './configs';
import { connectDB } from './configs/db';

const bootStrap = async () => {
	try {
		// Connect to DB
		await connectDB();

		// Listen to the Server
		app.listen(configs.port, () => {
			console.log('🟢 Server is Listening on Port: ', configs.port);
		});
	} catch (error) {
		if (error instanceof Error) {
			console.error('🚫 Error Occurred: ', error.message);
		} else {
			console.error('🛑 Unknown Error Occurred!');
		}
	}
};

bootStrap().catch(console.dir);
