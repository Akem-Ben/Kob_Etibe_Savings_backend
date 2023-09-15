import express from 'express';
import { createUser } from '../controllers/users';

const router = express.Router()

router.post('/create', createUser)

export default router