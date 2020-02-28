import BusinessAction from '../BusinessAction'
import { Comment } from '../models'

class CreateComment extends BusinessAction {
  validationConstraints = {
    postSlug: { presence: true },
    body: { presence: true }
  }

  async executePerform() {
    const { postSlug, body } = this.params
    const userId = this.performer.id

    await Comment.create({ postSlug, body, UserId: userId })
  }
}

export default CreateComment
