const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  console.error('ERROR 💥:', err);

  if (err.name === 'CastError') {
    return res.status(404).json({ status: 'fail', message: 'Resource not found' });
  }

  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors || {}).map((e) => e.message);
    return res.status(400).json({ status: 'fail', message: messages });
  }

  if (err.isOperational) {
    const response = {
      status: err.status,
      message: err.message,
    };
    if (err.errors && err.errors.length > 0) {
      response.errors = err.errors;
    }
    return res.status(err.statusCode).json(response);
  }

  if (process.env.NODE_ENV === 'development') {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      errors: err.errors,
      error: err,
      stack: err.stack,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Something went wrong on the server',
  });
};

export default errorHandler;
