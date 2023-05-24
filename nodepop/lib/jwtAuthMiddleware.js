const jwt = require('jsonwebtoken');
const createError = require('http-errors');

module.exports = async (req, res, next) => {
    try {
        //Get the jwToken from the header, the body or the query-string.
        const jwToken =
            req.get('Authorization') || req.body.jwt || req.query.jwt;

        //Check that a jwtToken was sent.
        if (!jwToken) {
            const error = createError(401, 'No token provided');
            next(error);
            return;
        }
        //Check that the token is valid
        const payload = await jwt
            .verify(jwToken, process.env.JWT_SECRET)

        req.loggedUser = payload._id

        next();
    } catch (error) {
        if (error.message === 'invalid signature') {
            next(createError(401, 'Invalid token'));
            return;
        }
        console.log(error.message)
        if (error.message == 'jwt expired') {
            next(createError(401, ('Jwt expired')));
            return;
        }

        next(error);
    }
};
