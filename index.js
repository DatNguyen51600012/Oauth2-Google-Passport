const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport')
const cookieSession = require('cookie-session')

app.use(cors())

app.use(bodyParser.urlencoded({extend: false}))

app.use(bodyParser.json())

app.use(cookieSession({
    name: 'dat-session',
    keys: ['key1', 'key2' ]
}))

app.use(passport.initialize());
app.use(passport.session());

app.get('/failed',(req , res) => res.send('failed'))
app.get('/good',(req,res) => res.send('welcome ${req.user.email} !'))


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

app.listen(3000, () => console.log('dasd'))
