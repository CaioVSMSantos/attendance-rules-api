import express from 'express'
import validateNewAttendanceRule from '../middlewares/validateNewAttendanceRule.js'
import attendanceRule from '../models/attendance-rule.js'

const router = new express.Router()
const endPoint = '/attendance-rules/'
const idParam = 'attendanceRuleId'

router.route(endPoint)
.post(validateNewAttendanceRule, async (req, res) => {
    try{
        let newAttendanceRule = req.body;
        newAttendanceRule = attendanceRule.saveAttendanceRule(newAttendanceRule)
        res.status(201)
            .location(endPoint + newAttendanceRule.id)
            .send()
    } catch (error) {
        res.status(400).send()
    }
})
.get(async (req, res) => {
    try {
        const attendanceRules = []
        //const attendanceRules = getAttendanceRules(req.query)
        if (attendanceRules.length !== 0) {
            return res.status(200).send(attendanceRules)
        }
        res.status(204).send()
    } catch (error) {
        res.status(500).send(error)
    }
})

router.route(endPoint + ':' + idParam)
.delete(async (req, res) => {
    try {
        const id = req.params[idParam]
        const attendanceRuleDeleted = {}
        //const attendanceRuleDeleted = deleteAttendanceRule(id)
        if (attendanceRuleDeleted) {
            return res.status(200).send()
        }
        res.status(404).send()
    } catch (error) {
        res.status(500).send()
    }
})

export default router