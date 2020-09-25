import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    getRecipes: [Recipe]
    getOneRecipe(recipeId: ID!): Recipe
    getMyRecipes: [Recipe]
  }
  type Recipe {
    id: ID!
    name: String!
    description: String!
    ingredients: String!
    category: Category!
    user: User!
  }
  extend type Mutation {
    createRecipe(input: recipeInput): Recipe
    updateRecipe(recipeId: ID!, input: recipeInput): Recipe
    deleteRecipe(recipeId: ID!): String
  }
  input recipeInput {
    name: String!
    description: String!
    ingredients: String!
    categoryId: ID!
  }
`;
