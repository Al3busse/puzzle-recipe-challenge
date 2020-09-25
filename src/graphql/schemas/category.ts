import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    getCategories: [Category]!
    getOneCategory(categoryId: ID!): Category
  }
  type Category {
    id: ID!
    name: String!
  }

  input updatedCategory {
    name: String!
  }

  extend type Mutation {
    createCategory(name: String!): Category
    updateCategory(categoryId: ID!, input: updatedCategory!): Category
    deleteCategory(categoryId: ID!): String
  }
`;
