const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
var admin_controller = require("../controllers/adminController");

const router = express.Router();

router.get("/", admin_controller.admin_login_get);
router.post("/login", admin_controller.admin_login_post);

module.exports = router;


// router.post(
//   "/signup",
//   passport.authenticate("signup", { session: false }),
//   async (req, res, next) => {
//     res.json({
//       message: "Signup successful",
//       admin: req.admin
//     });
//   }
// );