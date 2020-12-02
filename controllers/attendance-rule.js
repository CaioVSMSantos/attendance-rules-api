const express = require('express')

const router = new express.Router()
const endPoint = '/attendance-rule/'
const idParam = 'attendanceRuleId'

router.route(endPoint)
.post(async (req, res) => {
    res.send('This is POST for rules')
})
.get(async (req, res) => {
    res.send('This is GET for all rules. Also with filters')
})

router.route(endPoint + ':' + idParam)
.delete(async (req, res) => {
    res.send('This is DELETE for rules')
})

module.exports = {router, endPoint, idParam}