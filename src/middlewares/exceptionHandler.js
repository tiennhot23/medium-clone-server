const errorHandler = (err, req, res, next) => {
  logger.error(`ERROR::${err.message}`, err);
  if (err instanceof Error) {
    res.status(err.code || 500).json({
      error: err.name || 'INTERNAL SERVER ERROR',
      code: err.code || 500,
      message: err.message || 'Something wrong',
    });
  } else {
    next(err);
  }
};

const routeNotFoundHandler = (req, res) => {
  res.status(404).json({
    error: 'ROUTE NOT FOUND',
    code: 404,
    message: `Route: ${req.url}`,
  });
};

module.exports = { errorHandler, routeNotFoundHandler };
