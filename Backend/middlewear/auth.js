const { verifyUsertoken } = require("../services/authjwt");
console.log("Middleware file loaded");

function checkForAuth(cookieName) {
  return (req, res, next) => {
    console.log("➡️ Middleware triggered for:", req.path);

    const token = req.cookies[cookieName];
    if (!token) return next();

    try {
      const user = verifyUsertoken(token);
      console.log(user);
      req.user = user;
    } catch (error) {
      console.error(error);
    }

    return next();
  };
}
module.exports = checkForAuth;
