import dotenv from 'dotenv';

dotenv.config()

const {
    DEV_PORT,
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT
} = process.env

export default {
    PORT: DEV_PORT,
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT
}

console.log('Running in dev mode');