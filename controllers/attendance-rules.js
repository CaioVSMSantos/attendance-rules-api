import express from 'express'
import validateNewAttendanceRuleSyntax 
    from '../middlewares/validateNewAttendanceRuleSyntax.js'
import validateDateRangeFiltersSyntax
    from '../middlewares/validateDateRangeFiltersSyntax.js'
import ar from '../models/attendance-rule.js'

const router = new express.Router()
const endPoint = '/attendance-rules/'
const idParam = 'attendanceRuleId'

router.route(endPoint)
.post(validateNewAttendanceRuleSyntax, (req, res) => {
    try{
        const savedAttendanceRule = ar.saveNewAttendanceRule(req.body)
        if (savedAttendanceRule) {
            return res.status(201)
                .location(endPoint + savedAttendanceRule.id)
                .send()
        } else {
            return res.status(409).send({error: 'Conflicting time intervals'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
})
.get(validateDateRangeFiltersSyntax, (req, res) => {
    try {
        const attendanceRules = ar.getAttendanceRules(req.query)
        if (attendanceRules.length !== 0) {
            return res.status(200).send(attendanceRules)
        }
        res.status(204).send()
    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
})

router.route(endPoint + ':' + idParam)
.delete(async (req, res) => {
    try {
        const id = req.params[idParam]
        const attendanceRuleDeleted = ar.deleteAttendanceRule(id)
        if (attendanceRuleDeleted) {
            return res.status(200).send()
        }
        res.status(404).send()
    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
})

export default router