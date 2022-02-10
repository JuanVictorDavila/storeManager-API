// FONTE: Course da Trybe

const statusByErrorCode = {
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
    const status = statusByErrorCode[error.details[0].type];
    return res.status(status).json({ message: error.details[0].message });
  }
  
  const status = statusByErrorCode[error.code] || 500;
  
  res.status(status).json({ message: error.message });
};