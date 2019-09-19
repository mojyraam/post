const express = require('express')
const monitor = require('../../dao/monitor')
const router = express.Router()
const { ensureAuthenticated } = require('../../config/auth')

//monitor.monitorSelect.then(result => console.log(result.recordset))
router.get('/', ensureAuthenticated, (req, res) => {
    const d = req.session.passport.user.recordset[0].fk_location_02
    monitor.monitorSelect(d).then(result => {
        res.render('../views/monitor/monitor', {
            route: 'monitor',
            dm: result.recordset
        })
    })
})

module.exports = router