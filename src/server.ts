require("dotenv").config();
import express from "express";
import { ApolloServer, AuthenticationError } from "apollo-server-express";
import resolvers from "./graphql/resolvers/index";
import typeDefs from "./graphql/schemas/index";

export async function startServer() {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({
      req,
    }: {
      req: { headers: { authorization: string } };
    }) => {
      const token = req.headers.authorization || "";

      return { tokenBearer: token };
    },
    introspection: true,
    playground: true,
  });

  server.applyMiddleware({ app, path: "/graphql" });

  return app;
}
