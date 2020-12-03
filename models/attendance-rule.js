import fs from 'fs'
import { v1 as uuidv1 } from 'uuid';

const attendanceRulesPath = './saved-rules/'
const attendanceRulesFile = 'attendance-rules.json'
const attendanceRulesFilePath = attendanceRulesPath + attendanceRulesFile

function saveNewAttendanceRule (requestBody) {
    const newAR = buildNewAttendanceRule(requestBody)
    if (validateNonConflictingIntervals(newAR)) {
        saveAttendanceRuleJSON(newAR)
        return newAR
    } else {
        //return error informing conflicting intervals
    }
}

function buildNewAttendanceRule (requestBody) {
    const rule = {}
    rule.id = uuidv1()
    rule.day = requestBody.day
    rule.intervals = requestBody.intervals
    rule.options = requestBody.options
    return rule
}

function validateNonConflictingIntervals(newAttendanceRule) {
    return true
}

function saveAttendanceRuleJSON (newAR) {
    try {
        const attendanceRules = getAttendanceRulesJSON()
        attendanceRules.push(newAR)
        const attendanceRulesJSON = JSON.stringify(attendanceRules)
        if (fs.existsSync(attendanceRulesPath)) {
            fs.writeFileSync(attendanceRulesFilePath, attendanceRulesJSON);
        } else {
            fs.mkdirSync(attendanceRulesPath)
            fs.writeFileSync(attendanceRulesFilePath, attendanceRulesJSON);
        }
    } catch (error) {
        console.log(error)
    }
}

function getAttendanceRulesJSON (filter) {
    try {
        if (fs.existsSync(attendanceRulesFilePath)) {
            const buffer = fs.readFileSync(attendanceRulesFilePath)
            const rules = JSON.parse(buffer)
            return rules
        } else {
            return []
        }
    } catch (error) {
        console.log(error)
        return []
    }
}

const attendanceRule = {
    saveNewAttendanceRule,
    getAttendanceRulesJSON
}

export default attendanceRule