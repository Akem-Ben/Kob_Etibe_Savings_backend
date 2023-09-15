import {Request, Response, NextFunction} from 'express';
import {registerSchema} from '../middleware/validators';
import {Users, Wallets} from '../models';
import {v4} from 'uuid';
import { GenerateToken, hashPassword, passWordGenerator } from '../utilities/helpers';
import {Role, UserAttributes} from '../models/users'
import { UserTokenPayload } from '../interfaces/userinterfaces';
import { mailUserPassword } from '../utilities/notification';
import {WalletAttributes, WalletType} from '../models/wallets';

export const createUser = async(req:Request, res:Response)=> {
    try{

const {firstName, lastName, email, phone} = req.body

const validate = await registerSchema.validateAsync(req.body)

if (validate.error) {
    return res.status(400).json({
      Error: validate.error.details[0].message,
    });
  }
  const userId = v4()

  let password:any = await passWordGenerator(phone)
  let passwordChange = password.toString()
  const mainUserPassword = await hashPassword(passwordChange)
  const newEmail = email.trim().toLowerCase();
  const checkUserMail = await Users.findOne({where: {email:email}})
  if(checkUserMail) return res.status(400).json({message: `${email} is already in use`})
  const checkUserPhone = await Users.findOne({where: {phone:phone}})
if(checkUserPhone) return res.status(400).json({message: `${phone} already in use`})

const newUser = await Users.create({
    id: userId,
    firstName,
    lastName,
    email:newEmail,
    profilePic: "",
    password: mainUserPassword,
    role: Role.CONTRIBUTOR,
    otp: 0,
    phone,
    verified: false
}) as unknown as UserAttributes
const findUser = await Users.findOne({where: {email:newUser.email}}) as unknown as UserAttributes
if(findUser){
    const payload: UserTokenPayload = {
        id: findUser.id,
        email: findUser.email,
        verified: findUser.verified
    }
    const token = await GenerateToken(payload)
    res.cookie('token', token)
    await mailUserPassword({
        to: findUser.email,
        password: password
    })

const walletId = v4();

const newWallet = await Wallets.create({
    id: walletId,
    user_id: findUser.id,
    balance: 0,
    type: WalletType.GLOBAL,
    total_group_savings: 0,
    total_personal_savings: 0 
}) as unknown as WalletAttributes;
const wallet = await Wallets.findOne({where:{id:newWallet.id}}) as unknown as WalletAttributes;
    if(!wallet){
        await Users.destroy({where: {id:findUser.id}})
        return res.status(400).json({
            message: `Unable to create User`
        })
    }
    return res.status(200).json({
        message: `User created successfully`,
        User: findUser,
        Wallet: wallet
    })
}
}catch(err:any){
        console.log(err.message)
        return res.status(500).json({
            message: `Internal Server Error`
        })
}
}
//^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{1,8}$
