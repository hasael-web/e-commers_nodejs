import * as Joi from "joi";

export const TransactionValidate = Joi.object({
  total_price: Joi.number().required(),
  id_order: Joi.string().required(),
});
