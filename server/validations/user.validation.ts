import Joi from "joi";

const registerSchema = Joi.object().keys({
  name: Joi.string().min(1).alphanum().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
});

export { registerSchema };
