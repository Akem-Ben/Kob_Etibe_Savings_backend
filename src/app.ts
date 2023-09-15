import express from 'express';
import dotenv from 'dotenv';
import {db} from './config'
import {HttpError} from 'http-errors';
import config from './config/dbConfig'
import bodyParser from 'body-parser';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRoutes from './routes/userRoutes';

dotenv.config()

const app = express()

const {PORT} = config

app.use(bodyParser.json())

app.use(logger('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}));
app.use(cors())

app.use('/users', userRoutes)

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