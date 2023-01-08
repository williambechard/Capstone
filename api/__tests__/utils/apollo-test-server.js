import { ApolloServer } from '@apollo/server';
import { resolvers, typeDefs } from '../../src/schema';

export const getTestServer = () => {
  return new ApolloServer({
    typeDefs,
    resolvers
  });
};
