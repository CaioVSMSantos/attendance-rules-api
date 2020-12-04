import fs from 'fs'
import { v1 as uuidv1 } from 'uuid';
import {weekdays,
        isStandardDateFormat,
        standardPatternDateStringToDate,
        addDaysToDate,
        isDateRangeEqualsGreaterThanOneWeek
        } from '../utils/dateTimeUtils.js'
    

const attendanceRulesPath = './saved-rules/'
const attendanceRulesFile = 'attendance-rules.json'
const attendanceRulesFilePath = attendanceRulesPath + attendanceRulesFile
const startDateQueryParam = 'start-date'
const endDateQueryParam = 'end-date'

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

function getAttendanceRulesJSON () {
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

function getAttendanceRules (reqQuery) {
    if (dateQueryParamsExists(reqQuery)) {
        return filterAttendanceRules(reqQuery)
    } else {
        return getAttendanceRulesJSON()
    }
}

function dateQueryParamsExists (reqQuery) {
    return reqQuery[startDateQueryParam] && reqQuery[endDateQueryParam]
}

function filterAttendanceRules (reqQuery) {
    const rules = getAttendanceRulesJSON()
    let filteredRules = []
    filteredRules = filteredRules.concat(getAllDailyAttendanceRules(rules))
    filteredRules = filteredRules.concat(getWeeklyAttendanceRules(reqQuery, rules))
    filteredRules = filteredRules.concat(getAttendanceRulesByDate(reqQuery, rules))
    return filteredRules;
}

function getAllDailyAttendanceRules (rules) {
    return rules.filter(rule => rule.day === 'daily')
}

function getWeeklyAttendanceRules(reqQuery, rules) {
    const startDate = standardPatternDateStringToDate(reqQuery[startDateQueryParam])
    const endDate = standardPatternDateStringToDate(reqQuery[endDateQueryParam])
    if (isDateRangeEqualsGreaterThanOneWeek(startDate, endDate)) {
        return rules.filter(rule => weekdays.includes(rule.day))
    } else {
        const queryWeekdays = []
        let date = new Date()
        date.setTime(startDate.getTime())
        while (date <= endDate) {
            queryWeekdays.push(weekdays[date.getDay()])
            date = addDaysToDate(date, 1)
        }
        return rules.filter(rule => queryWeekdays.includes(rule.day))
    }
}

function getAttendanceRulesByDate (reqQuery, rules) {
    const startDate = standardPatternDateStringToDate(reqQuery[startDateQueryParam])
    const endDate = standardPatternDateStringToDate(reqQuery[endDateQueryParam])

    let filteredRules = rules.filter((rule) => {
        if (isStandardDateFormat(rule.day)) {
            const ruleDate = standardPatternDateStringToDate(rule.day)
            return startDate <= ruleDate && ruleDate <= endDate
        }
        return false
    })
    return filteredRules
}

const attendanceRule = {
    saveNewAttendanceRule,
    getAttendanceRules
}

export default attendanceRule