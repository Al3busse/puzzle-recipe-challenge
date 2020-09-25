"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
exports.default = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type User {\n    id: ID!\n    name: String!\n    email: String!\n    password: String!\n    recipes: [Recipe]!\n  }\n\n  extend type Query {\n    getUsers: [User]!\n  }\n\n  type Token {\n    token: String!\n  }\n  extend type Mutation {\n    signUp(input: signUpInput): User\n    logIn(input: loginInput): Token\n  }\n  input signUpInput {\n    name: String!\n    email: String!\n    password: String!\n  }\n  input loginInput {\n    email: String!\n    password: String!\n  }\n"], ["\n  type User {\n    id: ID!\n    name: String!\n    email: String!\n    password: String!\n    recipes: [Recipe]!\n  }\n\n  extend type Query {\n    getUsers: [User]!\n  }\n\n  type Token {\n    token: String!\n  }\n  extend type Mutation {\n    signUp(input: signUpInput): User\n    logIn(input: loginInput): Token\n  }\n  input signUpInput {\n    name: String!\n    email: String!\n    password: String!\n  }\n  input loginInput {\n    email: String!\n    password: String!\n  }\n"])));
var templateObject_1;
