const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const UserServices = require("../Services/userServices");
require("dotenv").config();

// Passport configuration
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.ClIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3060/auth/google/callback", // Update with your redirect URI
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user exists
        console.log("i am in passport configuration");
        let user = await UserServices.findByGoogleId(profile.id);
        if (!user) {
          // User doesn't exist, create a new user
          user = await UserServices.createUserFromGoogle(profile);
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
module.exports = passport;
