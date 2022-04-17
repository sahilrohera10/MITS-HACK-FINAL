const express = require("express");
const router = express.Router();
const user = require("../app/controllers/User");
// const productController = require("../app/controllers/productController");
// const reviewController = require("../app/controllers/reviewController");

router.post("/register", user.Register);
router.post("/verifyotp", user.verifyOtp);
router.post("/forum", user.Forum);
router.get("/getforum", user.Getforum);

// use routers

module.exports = router;
