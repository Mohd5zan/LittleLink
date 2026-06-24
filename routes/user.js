const express = require("express");
const { handleregisterpage, handlelogin } = require("../controllers/user");
const router = express.Router();

router.post("/create", handleregisterpage);
router.post("/login", handlelogin);

module.exports = router;
