const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const pool = require('./mysql/conexion');

function initialize(passport) {
    const authenticateUser = async (username, password, done) => {
        try {
            const [rows] = await pool.query('SELECT * FROM users WHERE usuario = ?', [username]);
            if (rows.length > 0) {
                const user = rows[0];
                const isMatch = await bcrypt.compare(password, user.contrasena);
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Contraseña incorrecta' });
                }
            } else {
                return done(null, false, { message: 'No existe el usuario' });
            }
        } catch (err) {
            return done(err);
        }
    };

    passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => {
        try {
            const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
            if (rows.length > 0) {
                done(null, rows[0]);
            } else {
                done(new Error('Usuario no encontrado'));
            }
        } catch (err) {
            done(err);
        }
    });
}

module.exports = initialize;
