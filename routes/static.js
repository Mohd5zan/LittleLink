const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const {
  handlehomepage,
  handleloginpage,
  handleregisterpage,
  handleuserpage,
  handlelogout,
  handleanalytics,
} = require("../controllers/static");
const isLoggedin = require("../middlewares/isLoggedin");
const router = express.Router();

router.get("/", handlehomepage);
router.get("/home", handlehomepage);
router.get("/login", handleloginpage);
router.get("/register", handleregisterpage);
router.get("/userpage", isLoggedin, handleuserpage);
router.post("/logout", isLoggedin, handlelogout);
// router.get("/analytics", handleanalytics);

module.exports = router;
