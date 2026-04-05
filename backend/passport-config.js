const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy
require('dotenv').config()//SECRET -> 58b076848722943c822abce935865e8616691533  bceb8422bc66808cf9acec7c153f269470de2d17

passport.serializeUser(function (user, done) {
    done(null, user)
})

passport.deserializeUser(function (obj, done) {
    done(null, obj)
})

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    //User.findOrCreate({ githubId: profile.id }, function (err, user)
      console.log(profile);// -> Shows more details: login, node_id, url and etc
      return done(null, accessToken);//(err, profile.id);
    })
)

module.exports = passport