const express = require('express')
const monitor = require('../../dao/monitor')
const router = express.Router()
const { ensureAuthenticated } = require('../../config/auth')


router.get('/:id', ensureAuthenticated, (req, res) => {
    monitor.monitorEditGet(req.params.id).then(result => {
        console.log(result)
        monitor.monitorCreateGet().then(result1 => {
            res.render('../views/monitor/editMonitor', {
                route: 'createMonitor',
                dcm: result1.recordsets,
                dem: result.recordset
            })
        })
    })
})

router.post('/', ensureAuthenticated, (req, res) => {
    monitor.dataUpdate(monitorData = [
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
        req.body.description,
        req.body.bid
    ]).then(
        res.redirect('/monitor')
    )
})

module.exports = router