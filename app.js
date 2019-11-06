import express from 'express'
import dotenv from 'dotenv'
import { CronJob } from 'cron'
import { db } from './models'
import { checkBulanan, checkCicilan } from './controllers/scheduler'
dotenv.config()

const app = express()
const port = process.env.PORT

db.authenticate().then(() => console.log(`Connected to database ...`))


let rule1 = '00 23 9 * *' // Setiap bulan, di tgl 9, jam 23:00 
let rule2 = '13 00 6 * *' // Setiap bulan, di tgl 6, jam 00:13
let rule3 = '* * * * *' // Setiap menit
let rule4 = '* * * * * *' // Setiap detik
let rule5 = '*/5 * * * * *' // Setiap 5 detik
new CronJob(rule1, async function () {
  try {
    console.log(`Cron running ...`)
    await checkBulanan()
    await checkCicilan()
  } catch (err) {
    console.log(`Cron job error ...`)    
    console.log(err)
  }
}, null, true, 'Asia/Jakarta')

app.listen(port, () => console.log(`App listening on port ${port} ...`))