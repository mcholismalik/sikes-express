import { Op } from 'sequelize'
import Axios from 'axios'
import moment from 'moment'
import { Vpembayaran } from '../models'

export const checkBulanan = async () => {
  const type = 'bulanan'
  await checkTunggakan(type).catch(err => {
    console.log(`Check tunggakan ${type} error`)
    console.log(err)
  })
}
export const checkCicilan = async () => {
  const type = 'cicilan'
  await checkTunggakan(type).catch(err => {
    console.log(`Check tunggakan ${type} error`)
    console.log(err)
  })
}
export const checkTunggakan = async type => {
  try {
    const tahun = moment().year()
    const bulan_ke = moment().month() + 1
    console.log(`Check tunggakan (${type}) tahun ${tahun} bulan_ke ${bulan_ke} started ...`)

    let whereParam = (type == 'bulanan')
      ? { nominal_sisa: { [Op.gt]: 0 }, transaction_type: type, tahun, bulan_ke }
      : { nominal_sisa: { [Op.gt]: 0 }, transaction_type: type }

    const data = await Vpembayaran.findAll({
      where: whereParam,
      raw: true
    })

    let sends = data.map(async v => {
      let { tarif_tipe, nis, nama, kelas, nominal_sisa } = v
      let msg = smsTemplate({ tarif_tipe, nis, nama, kelas, nominal_sisa, tahun, bulan_ke })
      await smsTagihan(v.no_ortu, msg)
    })
    await Promise.all(sends)
    console.log(`Check tunggakan (${type}) tahun ${tahun} bulan_ke ${bulan_ke} finished (${data.length}) ...`)
  } catch (err) {
    throw err
  }
}

export const smsTagihan = async (number, msg) => {
  const user = 'AvrielDG'
  const key = process.env.KEY
  await Axios.get(`http://sms241.xyz/sms/smsmasking.php?username=${user}&key=${key}&number=${number}&message=${msg}`)
    .then(res => console.log(`Send sms ${number} success ...`))
    .catch(err => console.log(`Send sms ${number} error ...`))
}

const smsTemplate = v => {
  const msg = `Diharapkan untuk siswa bernama ${v.nama} (${v.nis}) segera membayarkan tunggakan ${v.tarif_tipe} sebesar  Rp ${v.nominal_sisa}, untuk tahun ${v.tahun}, bulan ke ${v.bulan_ke}, kelas ${v.kelas}`
  return msg
}