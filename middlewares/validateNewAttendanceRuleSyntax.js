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
        && intervals.every((interval) => {
            return dtu.isStandardTimeInterval(interval)
        })
}

export default validateNewAttendanceRuleSyntax