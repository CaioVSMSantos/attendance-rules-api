//dd-MM-yyyy
const standardDatePattern = /^(0[1-9]|[12][0-9]|3[01])\-(0[1-9]|1[012])\-\d{4}$/

//HH:mm
const standardTimePattern = /^([01][0-9]|2[0-3])\:([0-5][0-9])$/

const standardDateDelimiter = '-'
const standardTimeDelimiter = ':'

//Ordered by Date.getUTCDay
const weekdays = ['sundays', 'mondays', 'tuesdays', 'wednesdays',
                  'thursdays', 'fridays', 'saturdays']

const startDateQueryParam = 'start-date'
const endDateQueryParam = 'end-date'

function isStandardDateFormat (dateString) {
    return standardDatePattern.test(dateString)
}

function isStandardTimeFormat (timeString) {
    return standardTimePattern.test(timeString)
}

function dateStringToDate (dateString) {
    if (isStandardDateFormat(dateString)) {
        const [dd, MM, yyyy] = dateString.split(standardDateDelimiter)
        return new Date(yyyy + '-' + MM + '-' + dd)
    } else {
        throw new Error('DateString must be in format \'dd-MM-yyyy\'')
    }
}

function timeStringToDate (timeString) {
    if (isStandardTimeFormat(timeString)) {
        const [HH, mm] = timeString.split(standardTimeDelimiter)
        //Using an arbitrary date
        return new Date('2000-01-01T' + HH + ':' + mm + ':00Z')
    } else {
        throw new Error('TimeString must be in format \'HH:mm\'')
    }
}

function dateToString (date) {
    return ('0' + date.getUTCDate()).slice(-2) + '-' 
        +  ('0' + (date.getUTCMonth() + 1)).slice(-2) + '-' 
               + date.getUTCFullYear()
}

function isDateRangeEqualsGreaterThanOneWeek (startDate, endDate) {
    const newDate = addDaysToDate(startDate, 6)
    return newDate <= endDate
}

function addDaysToDate (date, days) {
    if (date instanceof Date && typeof days === 'number'){
        let newDate = duplicateDate(date)
        newDate.setUTCDate(date.getUTCDate() + days)
        return newDate
    }
    return date
}

function compareTimeStrings (string1, string2) {
    const time1 = standardTimeStringToDate(string1)
    const time2 = standardTimeStringToDate(string2)

    if (time1 < time2) {
        return 1
    } else if (time1 > time2) {
        return -1
    } else {
        return 0
    }
}

function duplicateDate (date) {
    let newDate = new Date()
    newDate.setTime(date.getTime())
    return newDate
}

const dateTimeUtils = {
    weekdays,
    startDateQueryParam,
    endDateQueryParam,
    isStandardDateFormat,
    isStandardTimeFormat,
    dateStringToDate, 
    timeStringToDate,
    dateToString,
    isDateRangeEqualsGreaterThanOneWeek,
    addDaysToDate,
    compareTimeStrings,
    duplicateDate
}

export default dateTimeUtils