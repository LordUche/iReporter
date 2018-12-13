// All regex was gotten from Stack Overflow
export const validateLocation = (req, res, next) => {
  const { location } = req.body;
  if (
    !location
    || !/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/.test(
      location,
    )
  ) {
    return res.status(400).json({ status: 400, error: 'Please enter a valid (lag,lng) location' });
  }
  next();
};

export const validateComment = (req, res, next) => {
  const { comment } = req.body;
  if (!comment || !/\w+/.test(comment)) {
    return res.status(400).json({ status: 400, error: 'Please enter a comment' });
  }
  next();
};

export const validateStatus = (req, res, next) => {
  const { status } = req.body;
  if (!status || !/(draft|under investigation|resolved|rejected)/.test(status)) {
    return res.status(400).json({ status: 400, error: 'Please enter a valid status' });
  }
  next();
};

export const validateType = (req, res, next) => {
  const { type } = req.body;
  if (!type || !/(red-flag|intervention)/.test(type)) {
    return res.status(400).json({ status: 400, error: 'Please enter a valid type' });
  }
  next();
};

export const validateEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return res.status(400).json({ status: 400, error: 'Please enter a valid email' });
  }
  next();
};

export const validateNames = (req, res, next) => {
  const { firstname, lastname } = req.body;
  [firstname, lastname].forEach((name) => {
    if (!name || !/[a-zA-Z][^#&<>\\"~;$^%{}?]{1,20}$/g.test(name)) {
      return res.status(400).json({ status: 400, error: 'Please enter a valid name ' });
    }
  });
  next();
};

export const validateUsername = (req, res, next) => {
  const { username } = req.body;
  if (!username || !/[a-zA-Z0-9_]+/.test(username)) {
    return res.status(400).json({ status: 400, error: 'Please enter a valid username ' });
  }
  next();
};

export const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (!password || !/\w+/.test(password)) {
    return res.status(400).json({ status: 400, error: 'Please enter a password ' });
  }
  next();
};
