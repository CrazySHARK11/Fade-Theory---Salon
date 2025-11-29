export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);  

  const status = err.statusCode || 500;
  const message = err.statusCode
    ? err.message               
    : "Unexpected Error Occurred. Please try again later."; 

  res.status(status).json({
    success: false,
    message,
  });
};
