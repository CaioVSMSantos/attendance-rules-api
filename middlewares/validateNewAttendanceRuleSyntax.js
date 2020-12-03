function validateNewAttendanceRuleSyntax (req, res, next) {
    const requestBody = req.body
    if (validateDayProperty(requestBody.day) 
            && validateIntervalsProperty(requestBody.intervals)) {
        next()
    } else {
        res.status(400).send(
            {error: 'There are Syntactic errors in the request'})
    }
}

function validateDayProperty (day) {
    const validValues = ['daily', 'mondays', 'tuesdays', 'wednesdays',
        'thursdays', 'fridays', 'saturdays', 'sundays']
    return day 
        && (validValues.includes(day) || validateDateFormat(day))
}

function validateDateFormat (date) {
    //dd-MM-yyyy
    const regEx = /^(0[1-9]|[12][0-9]|3[01])\-(0[1-9]|1[012])\-\d{4}$/
    return regEx.test(date)
}

function validateTimeFormat (time) {
    //HH:mm
    const regEx = /^([01][0-9]|2[0-3])\:([0-5][0-9])$/
    return regEx.test(time)
}

function validateIntervalsProperty (intervals) {
    return intervals 
        && intervals.length !== 0 
        && validateIntervalsPropertyStructure(intervals)
}

function validateStartTimeLesserThanEndTime (startTime, endTime) {
    const [stHH, stMM] = startTime.split(':')
    const [enHH, enMM] = endTime.split(':')
    return (stHH < enHH) || (stHH == enHH && stMM <= enMM)
}

function validateIntervalsPropertyStructure (intervals) {
    return intervals.every((interval) => {
        return interval.start 
            && interval.end 
            && validateTimeFormat(interval.start) 
            && validateTimeFormat(interval.end)
            && validateStartTimeLesserThanEndTime(interval.start, interval.end)
    })
}

export default validateNewAttendanceRuleSyntax