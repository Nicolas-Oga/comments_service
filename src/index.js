import { ApolloServer, gql } from 'apollo-server'

import resolveWithBA from './resolveWithBA'

import Login from './business_actions/Login'
import CreateComment from './business_actions/CreateComment'

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    avatarUrl: String
  }

  type Vote {
    id: ID!
    comment: Comment!
    user: User!
  }

  type Comment {
    id: ID!
    user: User!
    body: String!
    votes: [Vote]
    repliesTo: Comment
    replies: [Comment]
    postSlug: String!
  }

  type UserAndToken {
    token: String!
    user: User!
  }

  type GenericOperationResponse {
    success: Boolean!
  }

  input GoogleOAuthData {
    accessToken: String!
    idToken: String!
  }

  input LoginInput {
    google: GoogleOAuthData!
  }

  input CreateCommentInput {
    postSlug: String
    body: String!
  }

  type Mutation {
    login(input: LoginInput!): UserAndToken!
    createComment(input: CreateCommentInput!): GenericOperationResponse!
  }

  type Query {
    comments(postSlug: String!): [Comment]
  }
`;

const resolvers = {
  Mutation: {
    login: resolveWithBA(Login),
    createComment: resolveWithBA(CreateComment)
  }
}

const server = new ApolloServer({
  typeDefs: gql`${fs.readFileSync(__dirname.concat('/schema.graphql'))}`,
  resolvers
})
server.listen().then(({ url }) => console.log(`🚀 Server ready at ${url}`))
