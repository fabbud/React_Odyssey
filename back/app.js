const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const authRouter = require('./routes/auth/auth');
const connection = require('./helpers/db');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const passportJWT = require('passport-jwt');
const bcrypt = require('bcrypt');
const app = express();
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

passport.use(
  'local',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    function (email, password, done) {
      connection.query(
        'select * from users where email = ?',
        [email],
        function (err, result) {
          console.log(err);
          console.log(result);
          if (err) return done(err);
          if (!result.length) {
            return done(null, false, { message: 'Invalid email' });
          }
          if (bcrypt.compareSync(password, result[0].password)) {
            return done(null, result[0]);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        },
      );
    },
  ),
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'coucou',
    },
    function (jwtPayload, done) {
      return done(null, jwtPayload);
    },
  ),
);

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database successfully');
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
  res.send('youhou');
});

app.use('/auth', authRouter); //where authRouter is imported
app.get('/profile', passport.authenticate('jwt', { session: false }), function (
  req,
  res,
) {
  res.send(req.user);
});

/// in case path is not found, return the 'Not Found' 404 code
app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// launch the node server
let server = app.listen(process.env.PORT || 5000, function () {
  console.log('Listening on port ' + server.address().port);
});
