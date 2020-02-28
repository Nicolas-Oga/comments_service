import BusinessAction from '../BusinessAction'
import { Comment, User } from '../models'

class ListPostComments extends BusinessAction {
  validationConstraints = {
    postSlug: { presence: true }
  }

  async executePerform() {
    const { postSlug } = this.params
    const comments = await Comment.findAll({ where: { postSlug }, include: User })

    const mapedComments = comments.map(comment => ({
      id: comment.id,
      createdAt: comment.createdAt.toISOString(),
      body: comment.body,
      user: {
        name: comment.User.name,
        avatarUrl: comment.User.avatarUrl
      }
    }))

    console.log(mapedComments[0].id)
    return mapedComments
  }
}

export default ListPostComments
