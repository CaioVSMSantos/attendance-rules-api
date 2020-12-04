//dd-MM-yyyy
const standardDatePattern = /^(0[1-9]|[12][0-9]|3[01])\-(0[1-9]|1[012])\-\d{4}$/

//HH:mm
const standardTimePattern = /^([01][0-9]|2[0-3])\:([0-5][0-9])$/

const standardDateDelimiter = '-'
const standardTimeDelimiter = ':'
const weekdays = ['mondays', 'tuesdays', 'wednesdays',
'thursdays', 'fridays', 'saturdays', 'sundays']

function isStandardDateFormat (dateString) {
    return standardDatePattern.test(dateString)
}

function isStandardTimeFormat (timeString) {
    return standardTimePattern.test(timeString)
}

function standardPatternDateStringToDate (dateString) {
    if (isStandardDateFormat(dateString)) {
        const [dd, MM, yyyy] = dateString.split(standardDateDelimiter)
        return new Date(yyyy + '-' + MM + '-' + dd)
    } else {
        throw new Error('DateString must be in format \'dd-MM-yyyy\'')
    }
}

function standardPatternTimeStringToDate (timeString) {
    if (isStandardTimeFormat(timeString)) {
        const [HH, mm] = timeString.split(standardTimeDelimiter)
        //Using an arbitrary date
        return new Date('2000-01-01T' + HH + ':' + mm + ':00Z')
    } else {
        throw new Error('TimeString must be in format \'HH:mm\'')
    }
}

function isDateRangeEqualsGreaterThanOneWeek (startDate, endDate) {
    const newDate = addDaysToDate(startDate, 6)
    return newDate <= endDate
}

function addDaysToDate (date, days) {
    if (date instanceof Date && typeof days === 'number'){
        let newDate = new Date()
        newDate.setTime(date.getTime())
        newDate.setDate(date.getDate() + days)
        return newDate
    }
    return date
}

export {
    weekdays,
    isStandardDateFormat,
    isStandardTimeFormat,
    standardPatternDateStringToDate, 
    standardPatternTimeStringToDate,
    addDaysToDate,
    isDateRangeEqualsGreaterThanOneWeek
}