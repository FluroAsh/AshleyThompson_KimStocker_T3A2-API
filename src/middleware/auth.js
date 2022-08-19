const jwt = require("jsonwebtoken");

/**
 * Verify if incoming request contains authorization header
 * & validates the users locally stored JWT token *if* one exists
 */
const verifyToken = (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    console.log(req.headers);
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.SECRET_KEY,
      (err, user) => {
        if (err) {
          req.user = undefined;
        } else {
          console.log("decode", user);
          req.user = user;
        }
        next();
      }
    );
  } else {
    req.user = undefined;
    next();
  }

  // if (error instanceof multer.MulterError) {
  //   if (error.code === 'LIMIT_FILE_SIZE') {
  //     return res.status(400).json({
  //       message: 'File is too large',
  //     });
  //   }

  //   if (error.code === 'LIMIT_FILE_COUNT') {
  //     return res.status(400).json({
  //       message: 'File limit reached',
  //     });
  //   }

  //   if (error.code === 'LIMIT_UNEXPECTED_FILE') {
  //     return res.status(400).json({
  //       message: 'File must be an image',
  //     });
  //   }
  // }
};

module.exports = {
  verifyToken,
};
