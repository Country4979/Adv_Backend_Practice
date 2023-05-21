const { Usuario } = require('../models/Usuario');
const jwt = require('jsonwebtoken');

class LoginController {
    index(req, res, next) {
        res.locals.error = '';
        res.locals.email = '';
        res.render('login');
    }

    async postAPI(req, res, next) {
        try {
            const { email, password } = req.body;

            const usuario = await Usuario.findOne({ email: email });

            if (!usuario || !(await usuario.comparePassword(password))) {
                res.jason({ error: 'invalid credentials' });
            }

            //JWT creation with jsonwebtoken library
            const token = await jwt.sign({_id: usuario._id }, process.env.JWT_SECRET, {
                expiresIn: '2d'
            })

            res.jason({ jwt: {token} });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = LoginController;
