import * as Joi from "joi";

const roleEnum = { customer: "customer", supplier: "supplier" };

export const RegisterValidate = Joi.object({
  email: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string()
    .valid(...Object.values(roleEnum))
    .default(roleEnum.customer),
});

export const LoginValidate = Joi.object({
  emailORusername: Joi.string().required(),
  password: Joi.string().required(),
});
