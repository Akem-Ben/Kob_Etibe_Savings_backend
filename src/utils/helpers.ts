import jwt from 'jsonwebtoken'
import {UserTokenPayload} from '../interfaces/userinterfaces'
import bcrypt from 'bcryptjs'

const APP_SECRET = process.env.APP_SECRET

export const GenerateToken = async(payload:UserTokenPayload)=>{
    return jwt.sign(payload, APP_SECRET!, { expiresIn: "1d" });
}

export const passWordGenerator = async(phone_no:string)=>{
    const passwordshuffle = phone_no.toString()
    let newShuffle = passwordshuffle.slice(-3)
    const mixup = newShuffle += Math.floor(100 + Math.random() * 9000)
    return mixup
}

export const hashPassword = async(password:string)=>{
    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(password, salt)
    return hash
}
