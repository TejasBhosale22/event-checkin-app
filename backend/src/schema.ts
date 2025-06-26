import { gql } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers } from './resolvers';

const typeDefs = gql`
  type User {
    id: String!
    name: String!
    email: String!
  }

  type Event {
    id: String!
    name: String!
    location: String!
    startTime: String!
    attendees: [User!]!
  }

  type Query {
    events: [Event!]!
    me: User
    hello: String
  }

  type Mutation {
    joinEvent(eventId: String!): Event
    leaveEvent(eventId: String!): Event

  }
`;

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
