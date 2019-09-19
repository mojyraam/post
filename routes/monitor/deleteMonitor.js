const express = require('express')
const monitor = require('../../dao/monitor')
const router = express.Router()
const { ensureAuthenticated } = require('../../config/auth')


router.get('/delete/:id', ensureAuthenticated, (req, res) => {
    monitor.dataDelete(req.params.id).then(res.redirect('/monitor'))
})

module.exports = router