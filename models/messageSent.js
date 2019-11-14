import db from '../utils/dbConfig'
import { Model, DataTypes } from 'sequelize'

export class MessageSent extends Model { }
MessageSent.init(
  {
    message_sent_id: { type: DataTypes.INTEGER, primaryKey: true },
    t_pembayaran_detail_id: { type: DataTypes.INTEGER },
    siswa_id: { type: DataTypes.INTEGER },
    no_ortu: { type: DataTypes.STRING(20) },
    message_type: { type: DataTypes.STRING(50) },
    message_text: { type: DataTypes.STRING(255) },
    nominal: { type: DataTypes.STRING(20) },
    date_added: { type: DataTypes.DATE },
    date_modified: { type: DataTypes.DATE },
    created_by: { type: DataTypes.INTEGER },
    active: { type: DataTypes.INTEGER },
  },
  {
    tableName: 'message_sent',
    underscored: true,
    timestamps: false,
    sequelize: db
  }
)
