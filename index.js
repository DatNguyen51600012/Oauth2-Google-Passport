const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport')
const cookieSession = require('cookie-session')

require('./passport-setup')

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
      done(null, user);
});

app.use(cors())

app.use(bodyParser.urlencoded({extend: false}))

app.use(bodyParser.json())

app.use(cookieSession({
    name: 'dat-session',
    keys: ['key1', 'key2' ]
}))

const isLoggedIn = (req,res,next) => {
    if ( req.user){
        next();
    } else {
        res.sendStatus(401)
    }
}

app.use(passport.initialize());

app.use(passport.session());

app.get('/',(req , res) => res.send('welcome'))
app.get('/failed',(req , res) => res.send('failed'))
app.get('/good',(req,res) => res.send('welcome ${req.user.displayName} !'))


app.get('/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get( '/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
    },
    function(req,res){
        res.redirect('/good');
    } 
));

app.get('/logout',(req,res) => {
    req.seesion = null;
    req.logout();
    req.redirect('/');
})

app.listen(3000, () => console.log('dasd'))
