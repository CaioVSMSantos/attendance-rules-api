import dotenv from 'dotenv'
dotenv.config()
import express, { json } from 'express'
import attendanceRuleRouter from './controllers/attendance-rules.js'

const app = express()
const SERVER_PORT = process.env.PORT || 3000

app.use(json())
app.use(attendanceRuleRouter)

app.listen(SERVER_PORT, () => {
    console.log(`Server running on port ${SERVER_PORT}`);
});