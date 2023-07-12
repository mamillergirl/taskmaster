const express = require('express')
const passport = require('passport')
const router = express.Router()
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const dotenv = require('dotenv');
dotenv.config();
const mongodb = require("../db/connect");



passport.use(
  new GoogleStrategy({
      // options for google strategy
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "https://taskmaster-oq75.onrender.com/google/callback"
  }, (accessToken, refreshToken, profile, done) => {
      

      const newUser = {
        googleId: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        image: profile.photos[0].value,
        email: profile.email,
        phoneNumber: "",
        birthday: "",
        address: "",
        interest: "",
        occupation: {
            jobTitle: "",
            responsibilities: "",
            education: "",
            expertise: "",
            skills: "",
            salary: ""
        }, 
        emergencyContact: {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: "",
            address: ""
        }
    };

      
        mongodb.getDb()
        .db("taskmaster")
        .collection("user")
        .find({ googleId: profile.id})
        .toArray()
        .then( (lists) => {
          
          if (lists.length == 0) 
          mongodb
            .getDb()
            .db("taskmaster")
            .collection("user")
            .insertOne(newUser).then((newUser) => {
                  console.log('new user created: ', newUser);
            });
          
        }
         )
        let user = profile
        done(null, user)
       
  
      } ))

      passport.serializeUser((user, done) => {
        done(null, user);
      });
      
      
      passport.deserializeUser((user, done) => {
        done(null, user);
      })
      
router.get('/', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/callback',
  passport.authenticate('google'), (req, res) => {
    res.redirect('/api-docs')
});
router.get('/login', (req,res) => {res.send(
  `<p>Sign in with Google First</p><button><a href="/google">Sign In</a></button>`
)})

router.get('/logout', (req, res, next) => {
  req.logout((error) => {
      if (error) {return next(error)}
      res.redirect('/')
  })
})

module.exports = router;