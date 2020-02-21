import { readFileSync } from 'fs'
import path from 'path'
import Sequelize from 'sequelize'

const env = process.env.NODE_ENV || 'development';
const config = JSON.parse(readFileSync(path.resolve(__dirname, '../db/config.json')))[env]

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
)

export { Sequelize, sequelize }
