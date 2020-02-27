import { UserInputError } from 'apollo-server'
import { BusinesActionValidationError } from './BusinessAction'

const resolveWithBA = BA => async (_root, { input }, _context) => {
  try {
    return await new BA(input).perform()
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
