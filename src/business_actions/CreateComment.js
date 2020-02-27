import BusinessAction from '../BusinessAction'
import Comment from '../models/Comment'

class CreateComment extends BusinessAction {
  validationConstraints = {
    postSlug: { presence: true },
    body: { presence: true }
  }

  async executePerform() {
    const { postSlug, body } = this.params

    await Comment.create({ postSlug, body, userId: undefined })

    return { success: false }
  }
}

export default CreateComment
