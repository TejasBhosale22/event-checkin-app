import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../src/store/useAuthStore';
import { getClient } from '../src/lib/graphqlClient';
import { GET_EVENTS } from '../graphql/queries';
import { JOIN_EVENT } from '../graphql/mutations';
import EventCard from '../components/EventCard';

interface Attendee {
  id: string;
  name: string;
  email: string;
}

interface Event {
  id: string;
  name: string;
  location: string;
  startTime: string;
  attendees: Attendee[];
}

interface EventsResponse {
  events: Event[];
}

export default function EventsScreen() {
  const socket = useAuthStore((s) => s.socket);
  const user = useAuthStore((s) => s.user);
  const client = getClient();

  const { data, isLoading, error } = useQuery<EventsResponse>({
    queryKey: ['events'],
    queryFn: () => client.request<EventsResponse>(GET_EVENTS),
  });

  // Store a local copy to update UI immediately
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (data?.events) setEvents(data.events);
  }, [data]);

  const { mutate: joinEvent } = useMutation({
    mutationFn: (eventId: string) =>
      client.request<{ joinEvent: Event }>(JOIN_EVENT, { eventId }),
    onSuccess: (response) => {
      const updated = response.joinEvent;

      // Optimistically update the event in local state
      setEvents((prev) =>
        prev.map((e) => (e.id === updated.id ? updated : e))
      );
    },
  });

  useEffect(() => {
    if (!socket || !events.length) return;

    const handleUpdate = () => {
      // fallback to refetch on server-side updates
      client.request<EventsResponse>(GET_EVENTS).then((res) => {
        setEvents(res.events);
      });
    };

    // Join rooms
    events.forEach((event) => {
      socket.emit('joinRoom', `event-${event.id}`);
    });

    socket.on('userJoined', handleUpdate);
    socket.on('userLeft', handleUpdate);
    socket.on('participantCount', handleUpdate);

    return () => {
      socket.off('userJoined', handleUpdate);
      socket.off('userLeft', handleUpdate);
      socket.off('participantCount', handleUpdate);
    };
  }, [socket, events]);

  if (isLoading) return <Text style={styles.status}>Loading...</Text>;
  if (error) return <Text style={styles.status}>Error fetching events</Text>;

  return (
    <FlatList
      data={events}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <EventCard event={item} onJoin={() => joinEvent(item.id)} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  status: {
    textAlign: 'center',
    marginTop: 40,
  },
});
