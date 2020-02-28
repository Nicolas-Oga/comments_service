import User from './User'
import Comment from './Comment'

User.hasMany(Comment)
Comment.belongsTo(User)

export { User, Comment }
