const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const session = require('express-session');

const app = express();

// Configuración de sesión
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Estrategia de autenticación local
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      bcrypt.compare(password, user.password, function(err, res) {
        if (res) { return done(null, user); }
        else { return done(null, false); }
      });
    });
  }
));

// Serialización y deserialización de usuario
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// Ruta de registro
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10, function(err, hash) {
    if (err) res.status(500).send(err);
    User.create({ username, password: hash }, (err, user) => {
      if (err) res.status(500).send(err);
      res.status(200).send('Usuario registrado');
    });
  });
});

// Ruta de inicio de sesión
app.post('/login', passport.authenticate('local'), (req, res) => {
  res.send('Inicio de sesión exitoso');
});
