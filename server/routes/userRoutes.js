const express = require("express");
const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").post(logout);

module.exports = router;