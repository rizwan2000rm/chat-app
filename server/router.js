const express = require("express");
const router = express.Router();

// Server Root Page
router.get("/", (req, res) => {
  res.send({ response: "Server is running." }).status(200);
});
// EXPORTS
module.exports = router;
