const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;


const User = require("../models/user.model");

module.exports= function (passport) {
    passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : process.env.SECRET,
        passReqToCallback: true
    },
    function (req, jwtPayload, done) {
        return User.findById(jwtPayload.id)
        .then(user => {
            req.user = user;
            return done(null, user);
        }).catch(err => {
            return done(null, false, err);
        });
    }))
}