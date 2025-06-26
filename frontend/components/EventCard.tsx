import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';

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

interface Props {
  event: Event;
  onJoin: () => void;
}

export default function EventCard({ event, onJoin }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{event.name}</Text>
      <Text style={styles.meta}>{event.location}</Text>
      <Text style={styles.meta}>{new Date(event.startTime).toLocaleString()}</Text>
      <Text style={styles.attendeeCount}>👥 {event.attendees.length} attending</Text>

      <View style={styles.avatarContainer}>
        {event.attendees.map((attendee) => (
          <View key={attendee.id} style={styles.avatar}>
            <Text style={styles.avatarText}>
              {attendee.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.button}>
        <Button title="Join Event" onPress={onJoin} color="#007BFF" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
  },
  meta: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  attendeeCount: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  avatarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    marginBottom: 12,
  },
  avatar: {
    backgroundColor: '#007BFF',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
    marginBottom: 6,
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  button: {
    alignSelf: 'flex-start',
  },
});
