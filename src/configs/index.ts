import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
	port: process.env.PORT as string,
	mongoUri: process.env.MONGO_URI as string,
	saltRounds: process.env.SALT_ROUNDS as string,
};
