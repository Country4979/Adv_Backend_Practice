const { Usuario } = require('../models');
const jwt = require('jsonwebtoken');

class LoginController {
    async postAPI(req, res, next) {
        try {
            const { email, password } = req.body;

            const usuario = await Usuario.findOne({ email: email });

            if (!usuario || !(await usuario.comparePassword(password))) {
                res.json({ error: 'invalid credentials' });
            }

            //JWT creation with jsonwebtoken library
            const token = await jwt.sign(
                { _id: usuario._id },
                process.env.JWT_SECRET,
                {
                    expiresIn: '2d',
                }
            );

            res.jason({ jwt: { token } });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = LoginController;
