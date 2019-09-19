const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const user = require('../dao/user');

module.exports = function(passport) {
    passport.use(
        new localStrategy({ usernameField: 'email' }, (email, password, done) => {
            // Match user
            user.userCheck(email).then(result => {
                //console.log(result)
                if(result.rowsAffected[0] === 0) {
                    return done(null, false, { message: 'این ایمیل ثبت نام نشده' })
                }

                // Match password
                bcrypt.compare(password, result.recordset[0].password, (err, isMatch) => {
                    if(err) throw err;
                    if(isMatch) {
                        return done(null, result)
                    } else {
                        return done(null, false, { message: 'کلمه عبور نادرست' })
                    }
                })
            }).catch(err => console.log(err))
        })
    )

    passport.serializeUser((user, done) => {
        done(null, user);
    })
    passport.deserializeUser((user, done) => {
        done(null, user);
    })
}