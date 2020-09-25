"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
exports.default = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  extend type Query {\n    getRecipes: [Recipe]\n    getOneRecipe(recipeId: ID!): Recipe\n    getMyRecipes(userId: ID!): [Recipe]\n  }\n  type Recipe {\n    id: ID!\n    name: String!\n    description: String!\n    ingredients: String!\n    category: Category!\n  }\n  extend type Mutation {\n    createRecipe(input: recipeInput): Recipe\n    updateRecipe(recipeId: ID!, input: recipeInput): Recipe\n    deleteRecipe(recipeId: ID!): String\n  }\n  input recipeInput {\n    name: String!\n    description: String!\n    ingredients: String!\n    categoryId: ID!\n  }\n"], ["\n  extend type Query {\n    getRecipes: [Recipe]\n    getOneRecipe(recipeId: ID!): Recipe\n    getMyRecipes(userId: ID!): [Recipe]\n  }\n  type Recipe {\n    id: ID!\n    name: String!\n    description: String!\n    ingredients: String!\n    category: Category!\n  }\n  extend type Mutation {\n    createRecipe(input: recipeInput): Recipe\n    updateRecipe(recipeId: ID!, input: recipeInput): Recipe\n    deleteRecipe(recipeId: ID!): String\n  }\n  input recipeInput {\n    name: String!\n    description: String!\n    ingredients: String!\n    categoryId: ID!\n  }\n"])));
var templateObject_1;
