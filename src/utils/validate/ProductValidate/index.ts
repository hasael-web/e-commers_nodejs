import * as Joi from "joi";

export const ProductValidate = Joi.object({
  categories: Joi.array().items(Joi.string().trim().required()).required(),
  description: Joi.string().trim().required().min(3),
  features: Joi.array().items(Joi.string().trim().required()).required(),
  material: Joi.string().trim(),
  name: Joi.string().trim().required(),
});

export const ProductUpdate = Joi.object({
  name: Joi.string().trim(),
  categories: Joi.array().items(Joi.string().trim()),
  description: Joi.string().trim().min(3),
  features: Joi.array().items(Joi.string().trim()),
  material: Joi.string().trim(),
  color: Joi.string().trim(),
  price: Joi.number(),
  size: Joi.string().trim(),
  stock: Joi.number(),
});
