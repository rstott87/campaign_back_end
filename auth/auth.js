const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const AdminModel = require("../models/admin");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

// passport strategies

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async (email, password, done) => {
      try {
        const admin = await AdminModel.create({ email, password });

        return done(null, admin);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: "TOP_SECRET",
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token")
    },
    async (token, done) => {
      try {
        return done(null, token.admin);
      } catch (error) {
        done(error);
      }
    }
  )
);

// ...

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async (email, password, done) => {
      try {
        const admin = await AdminModel.findOne({ email });

        if (!admin) {
          return done(null, false, { message: "admin not found" });
        }

        const validate = await admin.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: "Wrong Password" });
        }

        return done(null, admin, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);
