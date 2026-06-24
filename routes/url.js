const express = require("express");
const {
  handlegenerateurl,
  handleredirect,
  handleanalytics,
  handleVisitHistory,
} = require("../controllers/url");
const isLoggedin = require("../middlewares/isLoggedin");

const router = express.Router();

router.post("/generate", isLoggedin, handlegenerateurl);
router.get("/analytics", isLoggedin, handleanalytics);
router.get("/analytics/:id", isLoggedin, handleVisitHistory);
router.get("/:id", handleredirect);

module.exports = router;
