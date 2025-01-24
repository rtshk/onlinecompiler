const express = require("express");
const router = express.Router();

router.route("/save").post(save);
router.route("/delete").post(deletion);
router.route("/edit").post(edit);

module.exports = router;