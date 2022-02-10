const Joi = require('@hapi/joi');
// REF: validação usando Joi https://www.youtube.com/watch?v=xXjyqcDTkD0

module.exports = Joi.object({
  name: Joi.string().min(5).required().messages({
    'string.min': '"name" length must be at least 5 characters long',
    'string.base': '"name" should be a string',
    'string.empty': '"name" must contain value',
    'any.required': '"name" is required',
  }),
  quantity: Joi.number().min(1).required().messages({
    'number.min': '"quantity" must be a number larger than or equal to 1',
    'number.base': '"quantity" must be a number larger than or equal to 1',
    'any.required': '"quantity" is required',
  }),
});
