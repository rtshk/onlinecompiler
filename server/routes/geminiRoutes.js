const express = require("express");
const router = express.Router();
const {explain, complexity, notes, prompt, test} = require("../controllers/geminiControllers")

router.route("/explain").post(explain);
router.route("/complexity").post(complexity);
router.route("/notes").post(notes);
router.route("/prompt").post(prompt);
router.route("/test").post(test)


module.exports = router;