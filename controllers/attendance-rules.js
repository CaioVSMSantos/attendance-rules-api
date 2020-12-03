import express from 'express'
import validateNewAttendanceRuleSyntax 
    from '../middlewares/validateNewAttendanceRuleSyntax.js'
import ar from '../models/attendance-rule.js'

const router = new express.Router()
const endPoint = '/attendance-rules/'
const idParam = 'attendanceRuleId'

router.route(endPoint)
.post(validateNewAttendanceRuleSyntax, async (req, res) => {
    try{
        const savedAttendanceRule = ar.saveNewAttendanceRule(req.body)
        res.status(201)
            .location(endPoint + savedAttendanceRule.id)
            .send()
    } catch (error) {
        res.status(400).send()
    }
})
.get(async (req, res) => {
    try {
        const attendanceRules = ar.getAttendanceRulesJSON(req.query)
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
        //const attendanceRuleDeleted = ar.deleteAttendanceRule(id)
        if (attendanceRuleDeleted) {
            return res.status(200).send()
        }
        res.status(404).send()
    } catch (error) {
        res.status(500).send()
    }
})

export default router