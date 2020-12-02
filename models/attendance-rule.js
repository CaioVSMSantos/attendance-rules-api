import fs from 'fs'

function saveAttendanceRule (newAttendanceRule) {
    let attendanceRules = []
    attendanceRules.push(newAttendanceRule)
    const data = JSON.stringify(attendanceRules)
    fs.writeFileSync('attendance-rules.json', data);
    return newAttendanceRule
}

const attendanceRule = {
    saveAttendanceRule
}

export default attendanceRule