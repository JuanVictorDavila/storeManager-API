// FONTE: Course da Trybe

const statusErrorCode = {
  notFound: 404,
  alreadyExists: 409,
  'string.min': 422,
  'any.required': 400,
  'number.min': 422,
  'number.base': 422,
  amountError: 422,
};

module.exports = (error, _req, res, _next) => {
  if (error.isJoi) {
    const status = statusErrorCode[error.details[0].type];
    return res.status(status).json({ message: error.details[0].message });
  }
  
  const status = statusErrorCode[error.code] || 500;
  
  res.status(status).json({ message: error.message });
};