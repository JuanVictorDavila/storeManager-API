const Joi = require('@hapi/joi');
// REF: validação usando Joi https://www.youtube.com/watch?v=xXjyqcDTkD0

module.exports = Joi.object({
  name: Joi.string().min(5).required().messages()({
    'string.min': '"name" deve ter pelo menos 5 caracteres.',
    'string.base': '"name" deve ser uma string.',
    'string.empty': '"name" não pode estar vazio.',
    'any.required': '"name" é obrigatório.', 
  }),
  quantity: Joi.number().min(1).required().messages({
    'number.min': '"quantity" deve ser igual ou maior que 1',
    'number.base': '"quantity" deve igyual ou maior que 1',
    'any.required': '"quantity" é obrigatório',
  }),
});