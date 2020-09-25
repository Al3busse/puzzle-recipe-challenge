import { gql } from "apollo-server-express";

export default gql`
  type User {
    id: ID!
    name: String!
    email: String!
    recipes: [Recipe]!
  }

  type Token {
    token: String!
  }
  extend type Mutation {
    signUp(input: signUpInput): User
    logIn(input: loginInput): Token
  }
  input signUpInput {
    name: String!
    email: String!
    password: String!
  }
  input loginInput {
    email: String!
    password: String!
  }
`;
