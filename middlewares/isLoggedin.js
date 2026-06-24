const jwt = require("jsonwebtoken");

function isLoggedin(req, res, next) {
  let token = req.cookies.token;
  if (!token) {
    return res.redirect("/login");
  } else {
    let data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data;
  }
  next();
}
module.exports = isLoggedin;
