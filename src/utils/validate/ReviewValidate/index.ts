// id_user: number;
// username: string;
// rating: string;
// comment: string;
// id_product: string;

import * as Joi from "joi";

export const ReviewValidate = Joi.object({
  id_user: Joi.number().required(),
  username: Joi.string().required(),
  rating: Joi.number().required(),
  comment: Joi.string().required(),
  id_product: Joi.string().required(),
});
