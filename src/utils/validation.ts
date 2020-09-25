import Joi from "joi";

export const registrationSchema = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).email().required(),
  password: Joi.string().min(6).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().min(6).email().required(),
  password: Joi.string().min(6).required(),
});
