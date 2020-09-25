"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
exports.default = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  extend type Query {\n    getCategories: [Category]!\n    getOneCategory(categoryId: ID!): Category\n  }\n  type Category {\n    id: ID!\n    name: String!\n  }\n\n  input updatedCategory {\n    name: String!\n  }\n\n  extend type Mutation {\n    createCategory(name: String!): Category\n    updateCategory(categoryId: ID!, input: updatedCategory!): Category\n    deleteCategory(categoryId: ID!): String\n  }\n"], ["\n  extend type Query {\n    getCategories: [Category]!\n    getOneCategory(categoryId: ID!): Category\n  }\n  type Category {\n    id: ID!\n    name: String!\n  }\n\n  input updatedCategory {\n    name: String!\n  }\n\n  extend type Mutation {\n    createCategory(name: String!): Category\n    updateCategory(categoryId: ID!, input: updatedCategory!): Category\n    deleteCategory(categoryId: ID!): String\n  }\n"])));
var templateObject_1;
