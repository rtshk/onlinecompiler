const express = require("express");
const router = express.Router();
const {compile} = require("../controllers/compileControllers")

router.route("/").post(compile);

module.exports = router;