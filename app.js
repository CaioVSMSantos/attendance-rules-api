require('dotenv').config()
const express = require('express')
const attendanceRuleRouter = require('./controllers/attendance-rule.js')

const app = express()
const SERVER_PORT = process.env.PORT || 3000

app.use(express.json())
app.use(attendanceRuleRouter.router)

app.listen(SERVER_PORT, () => {
    console.log(`Server running on port ${SERVER_PORT}`);
});