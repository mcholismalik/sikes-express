import express from 'express'
import dotenv from 'dotenv'
import { CronJob } from 'cron'
import { db } from './models'
import { checkTunggakan } from './controllers/scheduler'
dotenv.config()

const app = express()
const port = process.env.PORT

db.authenticate().then(() =>  console.log(`Connected to database ...`))

let normal = '00 23 9 * *' // At 23:00 on day-of-month 9.
let trial = '13 00 6 * *' 
new CronJob(normal, function () {
  console.log(`Cron running ...`)
  checkTunggakan()
}, null, true, 'Asia/Jakarta')

app.listen(port, () => console.log(`App listening on port ${port} ...`))