const Joi = require('joi');

module.exports = Joi.object({
  name: Joi.string().min(3).required().messages({
    'string.min': '"name" length must be at least 3 characters long',
    'string.base': '"name" should be a string',
    'string.empty': '"name" must contain value',
    'any.required': '"name" is required',
  }),
  description: Joi.string().min(3).required().messages({
    'string.min': '"description" length must be at least 3 characters long',
    'string.base': '"description" should be a string',
    'string.empty': '"description" must contain value',
    'any.required': '"description" is required',
  }),
  category: Joi.string().min(3).required().messages({
    'string.min': '"category" length must be at least 3 characters long',
    'string.base': '"category" should be a string',
    'string.empty': '"category" must contain value',
    'any.required': '"category" is required',
  }),
  manufacturer: Joi.string().min(2).required({
    'string.min': '"manufacturer" length must be at least 3 characters long',
    'string.base': '"manufacturer" should be a string',
    'string.empty': '"manufacturer" must contain value',
    'any.required': '"manufacturer" is required',
  }),
  price: Joi.number().min(1).required().messages({
    'number.min': '"price" must be a number larger than or equal to 1',
    'number.base': '"price" must be a number larger than or equal to 1',
    'any.required': '"price" is required',
  }),
  quantity: Joi.number().min(1).required().messages({
    'number.min': '"quantity" must be a number larger than or equal to 1',
    'number.base': '"quantity" must be a number larger than or equal to 1',
    'any.required': '"quantity" is required',
  }),
});
