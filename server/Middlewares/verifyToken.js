const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyToken(req, res, next) {
    const bearerToken = req.headers.authorization;
    if (bearerToken) {
        const token = bearerToken.split(' ')[1];
        let decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        next();
    } else {
        res.status(200).send({ message: "Unauthorised access" });
    }
}

module.exports = verifyToken;