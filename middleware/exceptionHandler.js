export const exceptionHaldler = (error, req, res, next) => {
  const status = error.status;
  if (status) {
    return res.status(status).json({ message: error.message });
  }
  next(error);
};
