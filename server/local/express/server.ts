import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { connectToMongoDB } from '@/functions/backend/graphql/db/connection';
import { typeDefs } from '@/functions/backend/graphql/schema/typeDefs';
import { resolvers } from '@/functions/backend/graphql/schema/resolvers';

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server));

  // if (process.env.NODE_ENV === 'production') {
  //   app.use(express.static(path.join(__dirname, '../client/dist')));
  //
  //   app.get('*', (req, res) => {
  //     res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  //   });


  await connectToMongoDB();
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

// Call the async function to start the server
startApolloServer();
