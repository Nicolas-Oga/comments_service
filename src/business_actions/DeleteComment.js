import BusinessAction from '../BusinessAction'
import { Comment } from '../models'

class DeleteComment extends BusinessAction {
  validationConstraints = {
    commentId: { presence: true }
  }

  async isAllowed() {
    const comment = await this._comment()
    return comment.UserId === this.performer.id
  }

  async executePerform() {
    const comment = await this._comment()
    await comment.destroy()
  }

  // "Private"
  async _comment() {
    if (!this.__comment) {
      const { commentId } = this.params
      this.__comment = await Comment.findByPk(commentId)
    }

    return this.__comment
  }
}

export default DeleteComment
