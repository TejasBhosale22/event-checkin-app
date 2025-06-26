import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Socket } from 'socket.io-client';
import { connectSocket, getSocket } from '../socket/socket';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthStore {
  token: string | null;
  user: User | null;
  socket: Socket | null;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  connectSocket: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
  (set, get) => ({
    token: null,
    user: null,
    socket: null,
    setToken: (token) => set({ token }),
    setUser: (user) => set({ user }),
    connectSocket: () => {
      connectSocket();
      const socket = getSocket();
      set({ socket });
    },
  }),
  {
    name: 'auth-storage',
    storage: {
      getItem: async (name) => {
        const value = await AsyncStorage.getItem(name);
        return value ? JSON.parse(value) : null;
      },
      setItem: async (name, value) => {
        await AsyncStorage.setItem(name, JSON.stringify(value));
      },
      removeItem: async (name) => {
        await AsyncStorage.removeItem(name);
      },
    },
    partialize: (state) =>
      ({
        token: state.token,
        user: state.user,
      } as AuthStore),
  }
)

);
