//dd-MM-yyyy
const standardDatePattern = /^(0[1-9]|[12][0-9]|3[01])\-(0[1-9]|1[012])\-\d{4}$/

//HH:mm
const standardTimePattern = /^([01][0-9]|2[0-3])\:([0-5][0-9])$/

const standardDateDelimiter = '-'
const standardTimeDelimiter = ':'

//Ordered by Date.getUTCDay
const weekdays = ['sundays', 'mondays', 'tuesdays', 'wednesdays',
                  'thursdays', 'fridays', 'saturdays']

const daily = 'daily'
const startDateQueryParam = 'start-date'
const endDateQueryParam = 'end-date'

function getWeekdays () {
    return weekdays
}

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
    const time1 = timeStringToDate(string1)
    const time2 = timeStringToDate(string2)
    return compareDates(time1, time2)
}

function compareDates (date1, date2) {
    if (date1 < date2) {
        return 1
    } else if (date1 > date2) {
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

function areTimeIntervalsConflicting (i1, i2) {
    return isFirstTimeIntervalPartiallyInsideSecondTimeInterval(i1, i2)
        || isFirstTimeIntervalPartiallyInsideSecondTimeInterval(i2, i1)
        || isFirstTimeIntervalInsideSecondTimeInterval(i1, i2)
        || isFirstTimeIntervalInsideSecondTimeInterval(i2, i1)
}

/*
Returns true if:
Interval1 -             [s1-----------------e1]
Interval2 -     [s2----------------e2]
*/
function isFirstTimeIntervalPartiallyInsideSecondTimeInterval (i1, i2) {
    const start1 = timeStringToDate(i1.start)
    const end1 = timeStringToDate(i1.end)
    const start2 = timeStringToDate(i2.start)
    const end2 = timeStringToDate(i2.end)

    return start1 >= start2 
        && start1 < end2
        && end1 > start2
        && end1 >= end2
}

/*
Returns true if:
Interval1 -             [s1-------------e1]
Interval2 -     [s2-----------------------------e2]
*/
function isFirstTimeIntervalInsideSecondTimeInterval (i1, i2) {
    const start1 = timeStringToDate(i1.start)
    const end1 = timeStringToDate(i1.end)
    const start2 = timeStringToDate(i2.start)
    const end2 = timeStringToDate(i2.end)

    return start1 >= start2 
        && start1 < end2
        && end1 > start2
        && end1 <= end2
}

function isStandardTimeInterval (interval) {
    for (const obj in interval) {
        if (obj !== 'start' && obj !== 'end') {
            return false
        }
    }
    return isStandardTimeFormat(interval.start)
        && isStandardTimeFormat(interval.end)
        && compareTimeStrings(interval.start, interval.end) >= 0
}

function getWeekdayByDateString (dateString) {
    if (isStandardDateFormat(dateString)) {
        const date = dateStringToDate(dateString)
        return weekdays[date.getUTCDay()]
    }
    return undefined
}

const dateTimeUtils = {
    daily,
    startDateQueryParam,
    endDateQueryParam,
    
    getWeekdays,
    isStandardDateFormat,
    isStandardTimeFormat,
    dateStringToDate, 
    timeStringToDate,
    dateToString,
    isDateRangeEqualsGreaterThanOneWeek,
    addDaysToDate,
    compareTimeStrings,
    duplicateDate,
    areTimeIntervalsConflicting,
    isStandardTimeInterval,
    getWeekdayByDateString
}

export default dateTimeUtils