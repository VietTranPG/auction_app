var JwtStrategy = require('passport-jwt').Strategy;
var user_model = require('../model/user_model');
var common = require('../common/common');
module.exports = function(passport){
    var opts = {};
    opts.secretOrKey = common.SECRET;
    passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
        console.log(jwt_payload)
        if(jwt_payload.id){
            return done(null,false)
        }else{
            return done(null,jwt_payload)
        }
    }))
}