import { Sequelize, sequelize } from '../db'

class Comment extends Sequelize.Model {}

Comment.init({
  body: {
    type: Sequelize.STRING,
    allowNull: false
  },
  postSlug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  UserId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, { sequelize })

export default Comment
