const { validateToken } = require("../services/authjwt");

function checkForAuth(cookieName) {
  return (req, res, next) => {
    const token = req.cookies[cookieName];
    if (!token) return next();

    try {
      const user = validateToken(token);
      req.user = user;
    } catch (error) {}
    return next();
  };
}
module.exports = checkForAuth;
