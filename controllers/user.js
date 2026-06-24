const express = require("express");
const app = express();

const usermodel = require("../models/userdb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const cookieparser = require("cookie-parser");

// app.use(cookieparser());

async function handleregisterpage(req, res) {
  let { fullname, email, password } = req.body;
  // console.log(fullname, email, password);

  if (!fullname || !email || !password) {
    return res.status(401).render("register", {
      loginError: "Please Enter Every field",
    });
  }

  const exuser = await usermodel.findOne({ email });
  if (exuser) {
    return res.status(404).render("register", {
      loginError: "User already exist please sign in",
    });
  }

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      const user = await usermodel.create({
        fullname,
        email,
        password: hash,
      });
    });
  });
  res.redirect("/login");
}

async function handlelogin(req, res) {
  const { email, password } = req.body;
  const form = { email };

  if (!email || !password) {
    return res.status(400).render("login", {
      form,
      loginError: "Invalid credentials. Please check your email and password.",
    });
  }

  try {
    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.status(401).render("login", {
        form,
        loginError:
          "Invalid credentials. Please check your email and password.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).render("login", {
        form,
        loginError:
          "Invalid credentials. Please check your email and password.",
      });
    }
    let token = jwt.sign(
      { email: email, userid: user._id },
      process.env.JWT_SECRET,
    );
    res.cookie("token", token);

    return res.redirect("/userpage");
  } catch (err) {
    console.log("Login error:", err);
    return res.status(500).render("login", {
      form,
      loginError: "Something went wrong. Please try again.",
    });
  }
}

module.exports = {
  handleregisterpage,
  handlelogin,
};
