var express = require('express');
const db = require('../config/db');
const cascade = require('../dao/cascade');
var router = express.Router();


router.get('/county', (req, res) => {
    var selectedcounty = JSON.parse(req.query.selectedId)
    cascade.csCounty(selectedcounty).then(result => {
        res.send(result.recordset)
    })
})

router.get('/city', (req, res) => {
    var selectedcounty = JSON.parse(req.query.selectedId)
    cascade.csCity(selectedcounty).then(result => {
        res.send(result.recordset)
    })
})

router.get('/office', (req, res) => {
    var selectedcounty = JSON.parse(req.query.selectedId)
    cascade.csOffice(selectedcounty).then(result => {
        res.send(result.recordset)
    })
})


module.exports = router