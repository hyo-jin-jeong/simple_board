export const errorHandler = (error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
};
