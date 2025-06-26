import { gql } from 'graphql-request';

export const JOIN_EVENT = gql`
  mutation JoinEvent($eventId: String!) {
    joinEvent(eventId: $eventId) {
      id
      name
      attendees {
        id
        name
      }
    }
  }
`;
