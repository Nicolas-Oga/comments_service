import fs from 'fs'
import { ApolloServer, gql } from 'apollo-server'
import { ApolloLogExtension } from 'apollo-log'

import resolveWithBA from './resolveWithBA'
import AuthService from './AuthService'

import Login from './business_actions/Login'
import CreateComment from './business_actions/CreateComment'
import DeleteComment from './business_actions/DeleteComment'
import ListPostComments from './business_actions/ListPostComments'

const typeDefs = gql`${fs.readFileSync(__dirname.concat('/schema.graphql'))}`

const resolvers = {
  Query: {
    postComments: resolveWithBA(ListPostComments)
  },
  Mutation: {
    login: resolveWithBA(Login, { passingInput: true }),
    createComment: resolveWithBA(CreateComment, { passingInput: true }),
    deleteComment: resolveWithBA(DeleteComment)
  }
}

const server = new ApolloServer({
  resolvers,
  typeDefs,
  extensions: [_ => new ApolloLogExtension()],
  context: async ({ req }) => {
    const token = req.headers.authorization

    if (token) {
      const currentUser = await AuthService.getUser(token)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => console.log(`🚀 Server ready at ${url}`))
