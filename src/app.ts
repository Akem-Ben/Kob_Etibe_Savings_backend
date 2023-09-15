import express from 'express';
import dotenv from 'dotenv';
import {db} from './config'
import {HttpError} from 'http-errors';
import config from './config/dbConfig'

dotenv.config()

const app = express()

const {PORT} = config

const database = async () => {
try {
    await db.sync({});
    console.log("Database is connected");
} catch (err) {
    console.log(err instanceof HttpError ? err : "An error occurred");
}
}
database()

app.listen(PORT, ()=>{
    console.log(`app listening at ${PORT}`)
})