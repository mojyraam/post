const express = require('express')
const monitor = require('../../dao/monitor')
const router = express.Router()
const { ensureAuthenticated } = require('../../config/auth')


router.get('/', ensureAuthenticated, (req, res) => {
    monitor.monitorCreateGet().then(result => {
        res.render('../views/monitor/createMonitor', {
            route: 'createMonitor',
            dcm: result.recordsets
        })
    })
})

router.post('/', ensureAuthenticated, (req, res) => {
    monitor.dataCreate(monitorData = [
        req.body.state,
        req.body.county,
        req.body.city,
        req.body.office,
        req.body.asset,
        req.body.serial,
        req.body.nin,
        req.body.personal,
        req.body.mark,
        req.body.model,
        req.body.size,
        req.body.date,
        req.body.description
    ]).then(
        res.redirect('/')
    )
})

module.exports = router