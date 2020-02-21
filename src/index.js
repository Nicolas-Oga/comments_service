import { ApolloServer, gql } from 'apollo-server'
import Login from './business_actions/Login'

const typeDefs = gql`
  type User {
    name: String!
    email: String!
  }

  type Vote {
    comment: Comment!
    user: User!
  }

  type Comment {
    user: User!
    body: String!
    votes: [Vote]
    repliesTo: Comment
    replies: [Comment]
    threadSlug: String!
  }

  type UserAndToken {
    token: String!
    user: User!
  }

  input GoogleOAuthData {
    accessToken: String!
    idToken: String!
  }

  input LoginInput {
    google: GoogleOAuthData!
  }

  type Mutation {
    login(input: LoginInput!): UserAndToken!
  }

  type Query {
    comments(threadSlug: String!): [Comment]
  }
`;

const resolvers = {
  Mutation: {
    async login(_root, { input: { google: { accessToken, idToken }  } }, context) {
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Mutation: {
      login: (_root, { input }, _context) => new Login(input).perform()
    }
  }
})

server.listen().then(({ url }) => console.log(`🚀 Server ready at ${url}`))
