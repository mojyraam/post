const express = require('express')
const dcserver = require('../../dao/dcserver')
const router = express.Router()
const { ensureAuthenticated } = require('../../config/auth')


router.get('/', /*ensureAuthenticated,*/ (req, res) => {
    dcserver.dcserverCreateGet().then(result => {
        res.render('../views/dcserver/createDcserver', {
            route: 'createDcserver',
            dcds: result.recordsets
        })
    })
})

module.exports = router