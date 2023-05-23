const { Usuario } = require('../models');
const jwt = require('jsonwebtoken');

class LoginController {
    async postAPI(req, res, next) {
        try {
            const { email, password } = req.body;

            const usuario = await Usuario.findOne({ email: email });

            if (!usuario || !(await usuario.comparePassword(password))) {
                res.json({ error: 'Invalid credentials' });
                return;
            }
            
            //JWT creation with jsonwebtoken library
            const token = await jwt.sign(
                { _id: usuario._id },
                process.env.JWT_SECRET,
                {
                    expiresIn: '2d',
                }
            );

            res.json({ jwt: token });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = LoginController;
