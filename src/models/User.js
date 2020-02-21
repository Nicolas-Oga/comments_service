import { Sequelize, sequelize } from '../db'

class User extends Sequelize.Model {}

User.init({
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
}, { sequelize })

export default User
