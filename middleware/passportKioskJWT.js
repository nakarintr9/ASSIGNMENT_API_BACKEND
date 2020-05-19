const config = require('../config/index');
const Kiosk = require('../models/kiosk');
const passport = require('passport');

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.JWT_SECRET;
//opts.issuer = 'accounts.examplesoft.com';
//opts.audience = 'yoursite.net';
passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
       const kiosk = await (await Kiosk.findById(jwt_payload.id)).populate('wallet member'); 
       if (!kiosk) {
            err = {
               code: '0001',
               message: 'ไม่พบผู้ใช้ในระบบ'
           }
           return done(err, null);
       }

       return done(null, kiosk);

    } catch (error) {
        err = {
            code: '9999',
            message: 'Unaithorize & Unknown Error'
        }
        return done(err, null);
    }
}));

module.exports.isKioskLogin = passport.authenticate('jwt', { session: false });