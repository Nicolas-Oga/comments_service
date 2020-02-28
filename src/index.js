import fs from 'fs'
import { ApolloServer, gql } from 'apollo-server'

import resolveWithBA from './resolveWithBA'
import AuthService from './AuthService'

import Login from './business_actions/Login'
import CreateComment from './business_actions/CreateComment'
import ListPostComments from './business_actions/ListPostComments'

const typeDefs = gql`${fs.readFileSync(__dirname.concat('/schema.graphql'))}`

const resolvers = {
  Query: {
    postComments: resolveWithBA(ListPostComments)
  },
  Mutation: {
    login: resolveWithBA(Login, { passingInput: true }),
    createComment: resolveWithBA(CreateComment, { passingInput: true })
  }
}

const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: async ({ req }) => {
    const token = req.headers.authorization

    if (token) {
      const currentUser = await AuthService.getUser(token)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => console.log(`🚀 Server ready at ${url}`))
