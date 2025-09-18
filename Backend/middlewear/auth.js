const { verifyUsertoken } = require("../services/authjwt");
console.log("Middleware file loaded");

function checkForAuth(cookieName) {
  return (req, res, next) => {
    console.log("➡️ Middleware triggered for:", req.path);

    const token = req.cookies[cookieName];
    console.log(token);
    if (!token) {
      console.log("invalid ");
      req.user = null;
      return res.status(404).json("invalid token");
    }

    try {
      const user = verifyUsertoken(token);
      console.log(user);
      req.user = user;
      console.log("req.user", req.user);
    } catch (error) {
      console.error(error);
    }

    return next();
  };
}
function OptionalAuth(cookieName) {
  return (req, res, next) => {
    console.log("➡️ Middleware triggered for:", req.path);

    const token = req.cookies[cookieName];
    console.log(token);
    if (!token) {
      console.log("invalid ");
      req.user = null;
      return next();
    }

    try {
      const user = verifyUsertoken(token);
      console.log(user);
      req.user = user;
      console.log("req.user", req.user);
    } catch (error) {
      console.error(error);
    }

    return next();
  };
}
module.exports = { checkForAuth, OptionalAuth };
