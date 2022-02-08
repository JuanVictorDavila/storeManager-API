// REF: validação usando Joi https://www.youtube.com/watch?v=xXjyqcDTkD0
const Joi = require('@hapi/joi');

module.exports = Joi.object({
  productId: Joi.number().required().messages({
    'number.base': '"product_id" deve ser um numero.',
    'any.required': '"product_id" é obrigatório.',
  }),
  quantity: Joi.number().required().messages({
    'number.min': '"quantity" deve ser igual ou maior que 1',
    'number.base': '"quantity" deve ser igual ou maior que 1',
    'any.required': '"quantity" é obrigatório',
  }),
});