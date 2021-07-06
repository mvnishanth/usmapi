'use strict';
let jwt = require('jsonwebtoken');

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '365d' });
};

function verifyAccessToken(request, response, next) {
    const token = request.headers['x-access-token']
    if (token == null) return response.send({ status: 401, message: "Invalid Request" });
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) { return response.send({ status: 403, message: "user is not authorized" }); }
        else {
            request.user = user
            next()
        }
    })
};
module.exports = { generateAccessToken, verifyAccessToken };