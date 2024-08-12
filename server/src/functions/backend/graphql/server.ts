import { ApolloServer } from '@apollo/server';
import { typeDefs } from './schema/typeDefs';
import { resolvers } from './schema/resolvers';

// Create an instance of ApolloServer
export const graphqlServer = new ApolloServer({
  typeDefs,
  resolvers,
});