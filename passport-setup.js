
const passport = require('passport')

var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

passport.use(new GoogleStrategy({
    clientID:     '540199931576-3hjtrp7kakmsrtegji0m4o8tgpbvfh24.apps.googleusercontent.com',
    clientSecret: 'GBiZnC4RXl1eLc_6NWJ8qXO0',
    callbackURL: "http://localhost:3000/google/callback",
    
  },
  function(accessToken, refreshToken, profile, done) {    
    return done(null, profile);    
  }

));
