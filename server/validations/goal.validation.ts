import Joi from "joi";

const goalSchema = Joi.object({
  text: Joi.string().required(),
});

export { goalSchema };
