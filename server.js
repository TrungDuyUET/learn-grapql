const { GraphQLServer } = require('graphql-yoga')

const typeDefs = `
type Query {
  info: String!
  users: [User!]!
}
type Mutation {
    sign_up(name: String!, email: String!, password: String!): User!
}
type User {
  id: ID!
  name: String!
  email: String!
  password: String!
}
`
let users = [{
    id: '1',
    name: 'Nara-1',
    email: 'nara-1@jang',
    password: '123456'
}]

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        users: () => users,
    },

    User: {
        id: (root) => root.id,
        name: (root) => root.name,
        email: (root) => root.email,
        password: (root) => root.password,
    },
    Mutation: {
        sign_up: (root, args) => {
           const user = {
              id: `2`,
              name: args.name,
              email: args.email,
              password: args.password
          }
          users.push(user)
          return user
        }
      }
}
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))