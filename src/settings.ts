import dotenv from 'dotenv';

dotenv.config();

/* istanbul ignore next */
export const port = process.env.PORT || '3000';
export const connectionString = process.env.DATABASE_URL;
