import { OAuth2Client } from 'google-auth-library'
import jwt from 'jsonwebtoken'

import BusinessAction from '../BusinessAction'
import User from '../models/User'

const SECRET = process.env.SECRET || 'development_secret'

const oAuth2Client = new OAuth2Client(
  '785765963117-762e5rprni8gr0l2omjgbj8agi5v70e8.apps.googleusercontent.com',
  'C1-jyR0S7zd5uqa9BDsEMkb4',
  'http://localhost:8080'
)

const generateToken = user => jwt.sign({ userId: user.id }, SECRET)

class Login extends BusinessAction {
  runPerformWithinTransaction = true

  async executePerform() {
    const { google: { accessToken, idToken }} = this.params

    oAuth2Client.setCredentials({
      token_type: 'Bearer',
      access_token: accessToken,
      id_token: idToken
    })

    const {
      data: {
        names: [{ displayName: name }],
        emailAddresses: [{ value: email }]
      }
    } =
      await oAuth2Client.request({
        url: 'https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses'
      })

    const user =
      await User.findOne({ email }) ||
      await User.create({ email, name })

    const token = generateToken(user)

    return { token, user }
  }
}

export default Login
