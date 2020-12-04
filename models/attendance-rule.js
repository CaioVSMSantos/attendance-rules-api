import { v1 as uuidv1 } from 'uuid';
import dtu from '../utils/dateTimeUtils.js'
import fu from '../utils/fileUtils.js'
    
const path = './saved-rules/'
const fileName = 'attendance-rules.json'

function saveNewAttendanceRule (requestBody) {
    const newAR = buildNewAttendanceRuleObject(requestBody)
    if (validateNonConflictingIntervals(newAR)) {
        saveNewRuleToFile(newAR)
        return newAR
    } else {
        //return error informing conflicting intervals
    }
}

function buildNewAttendanceRuleObject (requestBody) {
    const rule = {}
    rule.id = uuidv1()
    rule.day = requestBody.day
    rule.intervals = requestBody.intervals
    return rule
}

function validateNonConflictingIntervals(newAR) {
    return true
}

function saveNewRuleToFile (newAR) {
    let rules = getAllAttendanceRules ()
    rules.push(newAR)
    fu.saveJSONFile(rules, path, fileName)
}

function getAllAttendanceRules () {
    let rules = fu.readJSONFile(path, fileName)
    if (!rules) {
        rules = []
    }
    return rules
}

function getAttendanceRules (reqQuery) {
    if (dateQueryParamsExists(reqQuery)) {
        const startDt = dtu.dateStringToDate(reqQuery[dtu.startDateQueryParam])
        const endDt = dtu.dateStringToDate(reqQuery[dtu.endDateQueryParam])
        return filterAttendanceRulesByDateRange(startDt, endDt)
    } else {
        return getAllAttendanceRules()
    }
}

function dateQueryParamsExists (reqQuery) {
    return reqQuery[dtu.startDateQueryParam] && reqQuery[dtu.endDateQueryParam]
}

function filterAttendanceRulesByDateRange (startDate, endDate) {
    let date = dtu.duplicateDate(startDate)
    const allRules = getAllAttendanceRules()
    let rules = []
    while (date <= endDate) {
        let rule = buildNewFormattedRuleObject(date)

        rule.intervals = rule.intervals.concat(
            getDailyRulesIntervals(allRules))

        rule.intervals = rule.intervals.concat(
            getWeeklyRulesIntervals(date, allRules))

        rule.intervals = rule.intervals.concat(
            getDateRulesIntervals(date, allRules))

        rules.push(rule)
        date = dtu.addDaysToDate(date, 1)
    }
    return rules
}

function buildNewFormattedRuleObject (date) {
    return {
        day: dtu.dateToString(date),
        intervals: []
    }
}

function getDailyRulesIntervals (allRules) {
    return getRulesIntervalsByDayFilter(allRules, 'daily')
}

function getWeeklyRulesIntervals (date, allRules) {
    const day = dtu.weekdays[date.getUTCDay()]
    return getRulesIntervalsByDayFilter(allRules, day)
}

function getDateRulesIntervals (date, allRules) {
    const day = dtu.dateToString(date)
    return getRulesIntervalsByDayFilter(allRules, day)
}

function getRulesIntervalsByDayFilter (rules, filter) {
    let intervals = []
    for (const rule of rules) {
        if (rule.day === filter) {
            intervals = intervals.concat(rule.intervals)
        }
    }
    return intervals
}

const attendanceRule = {
    saveNewAttendanceRule,
    getAttendanceRules
}

export default attendanceRule