import { Op } from 'sequelize'
import Axios from 'axios'
import moment from 'moment'
import { Vpembayaran } from '../models'

export const checkTunggakan = async () => {
  const tahun = moment().year()
  const bulan_ke = moment().month() + 1

  const data = await Vpembayaran.findAll({
    where: { nominal_sisa: { [Op.gt]: 0 }, tahun, bulan_ke },
    raw: true
  })

  data.map(async v => {
    let msg = `Harap membayarkan tunggakan ${v.tarif_tipe} tahun ${v.tahun}, bulan ke ${v.bulan_ke}, kelas ${v.kelas}, untuk siswa bernama ${v.nama}`
    await smsTagihan(v.no_ortu, msg)
    console.log(`Send sms tagihan ke ${v.no_ortu} ${v.nama} ...`)
  })
  console.log(`Check tunggakan tahun ${tahun} bulan_ke ${bulan_ke} ...`)
}

export const smsTagihan = async (number, msg) => {
  const user = 'AvrielDG'
  const key = 'd14206dae11253222bdaa88d910f585e'
  await Axios.get(`http://sms241.xyz/sms/smsmasking.php?username=${user}&key=${key}&number=${number}&message=${msg}`)
    .then(res => console.log(`Send sms ${number} success ...`))
    .catch(err => console.log(`Send sms ${number} error ...`))
}