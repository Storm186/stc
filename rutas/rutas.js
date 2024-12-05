const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const pool = require('../mysql/conexion');
// Rutas para renderizar las páginas HTML
router.get('/', (req, res) => {
    console.log('Se ha accedido a la ruta /'); 
    res.sendFile(path.join(__dirname, '../public/index.html')); // Ruta absoluta 
});

router.get('/ingreso', (req, res) => {
    console.log('Se ha accedido a la ruta /ingreso'); 
    res.sendFile(path.join(__dirname, '../public/login.html')); // Ruta absoluta 
});
router.get('/singup', (req, res) => {
    console.log('Se ha accedido a la ruta /singup');
    res.sendFile(path.join(__dirname, '../public/singUp.html'));
});
router.get('/test', (req, res)=>{
    console.log('Se ha accedido a la ruta /test');
    res.sendFile(path.join(__dirname, '../public/mistake.html'));
});
router.get('/blog', (req,res)=>{
    console.log('Se ha accedido a la ruta /blog');
    res.sendFile(path.join(__dirname, '../public/blog.html'));
});
router.post('/user', (req, res)=>{
    console.log('POST a /login/user')
    res.sendFile(path.join(__dirname, '../public/user.html'))
});
router.get('/login/user', (req, res)=>{
    console.log('Se ha accedido a la ruta /login/user');
    res.sendFile(path.join(__dirname, '../public/user.html'))
});



// Método POST para registrar usuarios
router.post('/registrar', async (req, res) => {
    const { usuario, correo, contrasena } = req.body;

    try {
        // Verificar si todos los campos están presentes
        if (!usuario || !correo || !contrasena) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(contrasena, salt);

        // Insertar el nuevo usuario en la base de datos
        await pool.query(
            'INSERT INTO users (usuario, correo, contrasena) VALUES (?, ?, ?)',
            [usuario, correo, hash]
        );

        res.status(201).redirect('/ingreso')
        console.log('Usuario registrado');
    } catch (err) {
        console.error('Error registrando el usuario', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


// Middleware para manejar rutas incorrectas (404)
router.get('*', (req, res) => {
    console.log('Ruta incorrecta:', req.originalUrl);
    res.status(404).sendFile(path.join(__dirname, '../public/notFound.html')); // Ruta absoluta
});

// Middleware de manejo de errores (500)
router.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).sendFile(path.join(__dirname, '../public/notFound.html')); // Ruta absoluta
});

module.exports = router;