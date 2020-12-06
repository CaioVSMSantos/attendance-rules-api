import dtu from '../utils/dateTimeUtils.js'

function validateDateRangeFiltersSyntax(req, res, next){
    const startDate = req.query[dtu.startDateQueryParam]
    const endDate = req.query[dtu.endDateQueryParam]

    if (startDate || endDate) {
        if (dtu.isStandardDateFormat(startDate) 
        && dtu.isStandardDateFormat(endDate)) {
            next()
        } else {
            res.status(400).send()
        }
    } else {
        next()
    }
}

export default validateDateRangeFiltersSyntax