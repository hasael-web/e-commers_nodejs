import * as Joi from "joi";

export const PostOrderValidate = Joi.object({
  price: Joi.number().required(),
  quantity: Joi.number().required(),
  id_product: Joi.string().required(),
});
