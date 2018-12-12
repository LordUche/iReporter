export const validateLocation = (req, res, next) => {
  if (
    !/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/.test(
      req.body.location,
    )
  ) {
    throw new Error('Please enter a valid (lag,lng) location');
  }
  next();
};

export const validateComment = (req, res, next) => {
  if (!/\w+/.test(req.body.comment)) {
    throw new Error('Please enter a comment');
  }
  next();
};
