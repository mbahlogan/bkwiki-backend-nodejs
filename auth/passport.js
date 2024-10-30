const passport = require("passport");
const passportJwt = require("passport-jwt");
const UserModel = require("../models/user.model");
const clientModel = require("../models/client.model");

const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;

passport.use(
  "client",
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (jwtpayload, done) => {
      const { id } = JSON.parse(jwtpayload.user);
      try {
        let user = await clientModel.findById(id)
        if (!user?.isActive) {
          return done(false);
        }
        return done(null, user);
      } catch {
        return done(false);
      }
    }
  )
);
passport.use(
  "admin",
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (jwtpayload, done) => {
      const { email } = JSON.parse(jwtpayload.user);
      try {
        let user = await UserModel.findOne({email}).populate(["organisation", "profile"])
        if (!user?.isActive) {
          return done(false);
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);
