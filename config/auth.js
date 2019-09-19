module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if(req.isAuthenticated()) {
            return next()
        }
        req.flash('error_msg', 'برای مشاهده محتوا لطفا وارد شوید');
        res.redirect('/users/login')
    }
}