import moment from 'moment'
import db from '../utils/dbConfig'
import { Model, DataTypes } from 'sequelize'

export class Vpembayaran extends Model { }
Vpembayaran.init(
  {
    t_pembayaran_id: { type: DataTypes.INTEGER, primaryKey: true },
    siswa_id: { type: DataTypes.INTEGER },
    tarif_nilai_id: { type: DataTypes.INTEGER },
    tahun: { type: DataTypes.INTEGER },
    bulan_ke: { type: DataTypes.INTEGER },
    nominal: { type: DataTypes.DOUBLE },
    nominal_min: { type: DataTypes.DOUBLE },
    nominal_bayar: { type: DataTypes.DOUBLE },
    date_added: { type: DataTypes.DATE },
    date_modified: { type: DataTypes.DATE },
    date_added2: { type: DataTypes.DATE },
    created_by: { type: DataTypes.INTEGER },
    nama: { type: DataTypes.STRING },
    nis: { type: DataTypes.STRING },
    no_ortu: { type: DataTypes.STRING },
    ta_id: { type: DataTypes.INTEGER },
    kelas: { type: DataTypes.DOUBLE },
    ta: { type: DataTypes.STRING },
    nominal_sisa: { type: DataTypes.DOUBLE },
    status: { type: DataTypes.STRING },
    tarif_tipe: { type: DataTypes.STRING },
    tarif_tipe_id: { type: DataTypes.INTEGER },
    transaction_type_id: { type: DataTypes.INTEGER },
    transaction_type: { type: DataTypes.STRING },
  },
  {
    tableName: 'v_pembayaran',
    underscored: true,
    timestamps: false,
    sequelize: db
  }
)
