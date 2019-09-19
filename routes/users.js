var express = require('express');
const user = require('../dao/user')
var router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');


// Login Page
router.get('/login', (req, res) => {
  res.render('login')
})

// Register Page
router.get('/register', (req, res) => {
  user.locationGet().then(result => {
    res.render('register', {
      route: 'register',
      l: result.recordset
    })
  })
})

// Register Handle
router.post('/register', (req, res) => {
  const { username, email, location, password, rpassword } = req.body
  let errors = []

  // Check required fields
  if(!username || !email || !password || !rpassword || !location) {
    errors.push({ msg: 'لطفا اطلاعات تمامی فیلد ها وارد شود' })
  }

  // Check passwords match
  if(password !== rpassword) {
    errors.push({ msg: 'کلمات عبور یکسان نیستند' })
  }

  // Check pass length
  if(password.length < 6) {
    errors.push({ msg: 'کلمه عبور باید حداقل شامل 6 کاراکتر باشد' })
  }

  if(location === 'action') {
    errors.push({ msg: 'لطفا نام استان خود را انتخاب کنید' })
  }

  if(errors.length > 0) {
    user.locationGet().then(result => {
      res.render('register', {
        route: 'register',
        e: errors,
        u: username,
        m: email,
        l: result.recordset,
        p: password,
        rp: rpassword
      })
    })
  } else {
    // Validation passed
    user.userCheck(req.body.email).then(result => {
      //console.log(result)
      if(result.rowsAffected > 0) {
        // User exists
        errors.push({ msg: 'ایمیل قبلا ثبت نام شده' })
        user.locationGet().then(result => {
          res.render('register', {
            route: 'register',
            e: errors,
            u: username,
            m: email,
            l: result.recordset,
            p: password,
            rp: rpassword
          })
        })
      } else {
        // Create new user
        var nuser = [
          username,
          password,
          email,
          location
        ]
        // Hash password
        bcrypt.genSalt(10, (err, salt) => 
          bcrypt.hash(nuser[1], salt, (err, hash) => {
            if(err) throw err
            // Set password to hashed
            nuser[1] = hash
            // Save new User
            user.userCreate(nuser).then(
              req.flash('success_msg', 'شما با موفقیت ثبت نام کردید و می توانید وارد شوید'),
              res.redirect('/users/login')
            ).catch(err => console.log(err))
          })
        )
      }
    })
  }
})

// Login handle
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
  //req.session.user = ...;
  //req.session.province = ...;
})

// Logout handle
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'شما با موفقیت خارج شدید')
  res.redirect('/users/login')
})

module.exports = router;
