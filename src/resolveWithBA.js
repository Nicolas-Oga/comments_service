import { UserInputError } from 'apollo-server'
import { BusinesActionValidationError } from './BusinessAction'

const resolveWithBA = (BA, { passingInput } = {}) => async (_root, args, { currentUser }) => {
  const params = passingInput ? args.input : args

  try {
    return await new BA(params, currentUser).perform()
  } catch (error) {
    if (!(error instanceof BusinesActionValidationError)) {
      throw error
    }

    throw new UserInputError('Validation Error', {
      originalError: error,
      errorsPerField: error.errors
    })
  }
}

export default resolveWithBA
