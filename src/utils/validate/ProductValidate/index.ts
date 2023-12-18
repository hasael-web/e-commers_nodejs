import * as Joi from "joi";

export const ProductValidate = Joi.object({
  categories: Joi.array().items(Joi.string().trim().required()).required(),
  color: Joi.array().items(Joi.string().trim().required()).required(),
  description: Joi.string().trim().required().min(3),
  features: Joi.array().items(Joi.string().trim().required()).required(),
  material: Joi.string().trim(),
  name: Joi.string().trim().required(),
  price: Joi.number().required(),
  size: Joi.array().items(Joi.string().trim().required()).required(),
  stock: Joi.number().required(),
});

export const ProductUpdate = Joi.object({
  categories: Joi.array().items(Joi.string().trim()),
  color: Joi.array().items(Joi.string().trim()),
  description: Joi.string().trim().min(3),
  features: Joi.array().items(Joi.string().trim()),
  material: Joi.string().trim(),
  name: Joi.string().trim(),
  price: Joi.number(),
  size: Joi.array().items(Joi.string().trim()),
  stock: Joi.number(),
});
