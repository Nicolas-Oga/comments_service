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
  avatarUrl: { type: Sequelize.STRING },
}, { sequelize })

export default User
