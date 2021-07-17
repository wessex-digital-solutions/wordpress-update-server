import dotenv from 'dotenv';

dotenv.config();

export const port = process.env.PORT || '3000';
export const connectionString = process.env.DATABASE_URL;
