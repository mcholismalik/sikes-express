import Sequelize from 'sequelize'

const config = {
  host: 'localhost',
  username: 'root',
  password: '',
  database: 'sikes',
  dialect: 'mysql',
  logging: false,
  timezone: '+07:00'
}
export default new Sequelize(config)