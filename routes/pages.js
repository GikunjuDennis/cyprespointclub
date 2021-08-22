const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.send("Hello from the root application");
});
router.get("/signup");
router.get("/login");

module.exports = router;
