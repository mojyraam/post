const express = require('express')
const dcserver = require('../../dao/dcserver')
const router = express.Router()
const { ensureAuthenticated } = require('../../config/auth')

//monitor.monitorSelect.then(result => console.log(result.recordset))
router.get('/', ensureAuthenticated, (req, res) => {
    const d = req.session.passport.user.recordset[0].fk_location_02
    dcserver.dcserverSelect(d).then(result => {
        console.log(result)
        res.render('../views/dcserver/dcserver', {
            route: 'dcserver',
            dds: result.recordset
        })
    })
})

module.exports = router