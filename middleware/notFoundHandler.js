export const notFoundHandler = (req, res, next) => {
  const message = '잘못된 요청입니다.';
  res.status(404).send({ message });
};
