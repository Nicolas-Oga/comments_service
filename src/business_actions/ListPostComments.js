import BusinessAction from '../BusinessAction'
import { Comment, User } from '../models'

class ListPostComments extends BusinessAction {
  validationConstraints = {
    postSlug: { presence: true }
  }

  async executePerform() {
    const { postSlug } = this.params
    const comments = await Comment.findAll({ where: { postSlug }, include: User })

    return comments.map(comment => ({
      id: comment.id,
      createdAt: comment.createdAt.toISOString(),
      body: comment.body,
      user: {
        id: comment.User.id,
        name: comment.User.name,
        avatarUrl: comment.User.avatarUrl
      }
    }))
  }
}

export default ListPostComments
