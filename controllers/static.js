function handlehomepage(req, res) {
  res.render("home");
}

function handleloginpage(req, res) {
  res.render("login");
}

function handleregisterpage(req, res) {
  res.render("register");
}

function handleuserpage(req, res) {
  res.render("userpage");
}

function handlelogout(req, res) {
  res.cookie("token", "");
  return res.redirect("/login");
}



module.exports = {
  handlehomepage,
  handleloginpage,
  handleregisterpage,
  handleuserpage,
  handlelogout,
};
