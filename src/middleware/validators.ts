import Joi from 'joi'

export const registerSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2}),
    phone: Joi.string().required().min(11)
})