const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const key = require('./keys');

const User = mongoose.model("users");
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key.secretOrKey;

// token 令牌验证：
module.exports = (passport) => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        // Payload（载荷，jwt_payload）
        // {
        //     "id": "657a234567890abc",
        //     "name": "Leon",
        //     "iat": 1710109600,  // 令牌签发时间（时间戳）
        //     "exp": 1710113200   // 令牌过期时间（时间戳）
        // }
        console.log(jwt_payload);

        User.findById(jwt_payload.id)
            .then((user) => {
                if (user)
                    return done(null, user);    
                return done(null, false);
            })
            .catch((err) => {
                console.log(err);
            })
    }));
}