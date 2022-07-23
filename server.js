require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express(); 
const PORT = process.env.port || 3000;
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const initalizePassport = require('./passport-config');

//This allows us to use .ejs
app.set('view-engine', 'ejs')
//This makes req.body.username work
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(session({
   secret: process.env.SESSION_SECRET,
   resave: false,
   saveUninitialized: false
}));
app.use( express.static( "public" ) );
initalizePassport(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

//Routes
app.use('/captions', require('./routes/captions.js')); 
app.use('/users', require('./routes/users.js'));
app.use('/images', require('./routes/images.js'));
app.use('/register', require('./routes/register.js'));
app.use('/login', require('./routes/login.js'));
app.use('/logout', require('./routes/logout.js'));
//app.use('/view-image', require('./routes/view-image.js'));

//Front end
app.get('/', checkAuthenticated, async (req, res, next) => {
   res.render('index.ejs', {
      username: req.user.username
   });
});
app.get('/login', checkNotAuthenticated, (req, res, next) => res.render('login.ejs'));
app.get('/register', checkNotAuthenticated, (req, res, next) => res.render('register.ejs'));
app.delete('/logout', checkAuthenticated, (req, res) => {
   req.logOut();
   req.redirect('/login');
});

//Middleware function to redirect user to a login page if they aren't logged in
function checkAuthenticated(req, res, next) {
   if (req.isAuthenticated()) {
     return next();
   }
   res.redirect('/login'); 
 }
 
 //Prevents logged in users to go to pages they aren't supposed to
 function checkNotAuthenticated(req, res, next) {
   if (req.isAuthenticated()) {
     return res.redirect('/');
   }
   next();
 }

app.listen(PORT, () => {
   console.log(
      `Running Photo Caption Contest - Listening on port ${PORT}`
   );
});
