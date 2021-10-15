const conf = require('config');
const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
//const knex = require('./../helpers/knex');



module.exports = {
    getNewJwt: (user, pwd) => {
        if (! checkUser(user)) {
            throw {
                name: 'UnknownUserError',
                message: 'Unknown user "' + user + '"',
                code: 'unknown_user',
                status: 401
            };
        }

        if (! checkPwd(user, pwd)) {
            throw {
                name: 'WrongPasswordError',
                message: 'Wrong password for user "' + user + '"',
                code: 'wrong_password',
                status: 401
            };
        }

        return {
            jwt: generateJwt(user)
        }
    },

    getJwtInfo: req => {
        return {
            jwt: req.jwtLoad
        }
    }
};

function checkUser(user) {
return true;
    //:*:x: TODO: Module "jwt-service": Function "checkUser": Really check user existence from the persisted user profile.
}

function checkPwd(user, pwd) {
return true;
    //:*:x: TODO: Module "jwt-service": Function "checkPwd": Really check user password from the persisted user profile.
}

function generateJwt (userId) {
    let jwt = {
        header: {
            typ: 'JWT',
            alg: 'HS256' // HS256: AES-128 CBC + HMAC SHA 256
        },
        body: {
            iss: 'X3-NURSERY',
            exp: Date.now() + 1 * 24 * 60 * 60 * 1000, // 24 hours from "now" up.
            user: userId,
            roles: getUserRoles(userId),
        }
    };

    return jsonwebtoken.sign(jwt, conf.security.jwt.accessTokenSecret);
}

function getUserRoles(userId) {
return ['ADMIN', 'USER'];
    //:*:x: TODO: Module "jwt-service": Function "getUserRoles": Really get the user roles from the persisted user profile.
}
