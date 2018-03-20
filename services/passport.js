const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');


passport.serializeUser( (user, done) => {
    //call serialize to the genereate identify piece
    done(null, user.id); 
});

passport.deserializeUser( (id, done) => {
    //call deserialize for find user only by user object
    User.findById(id)
    .then( user => {
        done(null, user);
    })
})



passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, 
    async (accessToken, refreshToken, profile, done) => {
        // search if user are alredy in DB
        const existingUser = await User.findOne({ googleID: profile.id });
       
        if(existingUser){
            // already have a record;  Passport , everything is fine. Just finish
            return done(null, existingUser); // put to the Serialize
        }

        // we dont' have a user record with this ID ( see more in User.js)
        const user = await new User({ googleID: profile.id }).save();
        done(null, user); // put to the Serialize
              
    }
)); 

