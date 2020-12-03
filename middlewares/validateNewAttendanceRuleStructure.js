function validateNewAttendanceRuleStructure (req, res, next) {
    const attendanceRule = req.body
    const isValid = validateDay(attendanceRule.day) 
            && validateIntervals(attendanceRule.intervals) 
            && validateOptions(attendanceRule.options)
    if (isValid) {
        next()
    } else {
        res.status(400).send({error: 'Attendance Rule could not be validated. \
                Check for syntax errors'})
    }
    next()
}

function validateDay (day) {
    if (day) {
        return true
    } else {
        return false
    }
}

function validateIntervals (intervals) {
    if (intervals && intervals.length !== 0) {
        const isValid = intervals.every((intervalData) => {
            return true;
        })
        return isValid
    } else {
        return false
    }
}

function validateOptions (options) {
    return true
}

export default validateNewAttendanceRuleStructure