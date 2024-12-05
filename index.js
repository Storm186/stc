const express = require('express');
const path = require('path');
const rutas = require('./rutas/rutas.js');
const session = require('express-session');
const bodyParser = require('body-parser');



// Inicio del servicio
const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
// MIDDLEWARES
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', rutas);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Working Server
app.listen(port, () => {
    console.log('Server Working on Port: ', port);
});