const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();

// ...

//imow - when post request is made to route /signup, passport's authenticate method is run. responds with json that sing up was succesful and includes the ueser from the REQ object.

router.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
    res.json({
      message: "Signup successful",
      admin: req.admin
    });
  }
);

router.get("/login", (req, res) => res.render("login"));
//if login is succuessful, a token is created and then saved to cookies to allow client to continue to use it.
router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, admin, info) => {
    try {
      if (err || !admin) {
        const error = new Error("An error occurred.");

        return next(error);
      }
      req.login(admin, { session: false }, async (error) => {
        if (error) return next(error);
        const body = { _id: admin._id, email: admin.email };
        const token = jwt.sign({ admin: body }, "TOP_SECRET");
        res.cookie("jwt", token);
        return res.redirect('/private/welcome');
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = router;
