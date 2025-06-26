// App.tsx
import React, { useEffect } from 'react';
import { ApolloProvider } from '@apollo/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { client } from './apollo/client';
import LoginScreen from './screens/LoginScreen';
import EventsScreen from './screens/EventsScreen';
import { useAuthStore } from './src/store/useAuthStore';
import AppNavigator from './src/navigation/AppNavigator';

const queryClient = new QueryClient();

export default function App() {
  const token = useAuthStore((s) => s.token);
  const connectSocket = useAuthStore((s) => s.connectSocket);

  useEffect(() => {
    connectSocket();
  }, []);

  return (
  <SafeAreaProvider>
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={client}>
        <AppNavigator />
      </ApolloProvider>
    </QueryClientProvider>
  </SafeAreaProvider>
);
}
