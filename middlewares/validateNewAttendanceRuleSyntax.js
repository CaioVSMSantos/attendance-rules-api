import dtu from '../utils/dateTimeUtils.js'

function validateNewAttendanceRuleSyntax (req, res, next) {
    if (validateDayProperty(req.body.day) 
        && validateIntervalsProperty(req.body.intervals)) {
        next()
    } else {
        res.status(400).send()
    }
}

function validateDayProperty (day) {
    return day 
        && (day === 'daily' 
            || dtu.weekdays.includes(day) 
            || dtu.isStandardDateFormat(day))
}

function validateIntervalsProperty (intervals) {
    return intervals 
        && intervals.length !== 0 
        && intervals.every(interval => validateIntervalObject)
}

function validateIntervalObject (interval) {
    return interval.start 
        && interval.end 
        && dtu.isStandardTimeFormat(interval.start)
        && dtu.isStandardTimeFormat(interval.end)
        && dtu.compareTimeStrings(interval.start, interval.end) >= 1
}

export default validateNewAttendanceRuleSyntax