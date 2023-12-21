import * as Joi from "joi";

export const RegisterValidate = Joi.object({
  email: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const LoginValidate = Joi.object({
  emailORusername: Joi.string().required(),
  password: Joi.string().required(),
});
