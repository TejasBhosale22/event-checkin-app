import { GraphQLClient } from 'graphql-request';
import { useAuthStore } from '../store/useAuthStore';

export const getClient = () => {
  const token = useAuthStore.getState().token;
  return new GraphQLClient('http://localhost:4000/graphql', {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
};
