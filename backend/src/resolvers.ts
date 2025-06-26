import { PrismaClient } from '@prisma/client';

interface Context {
  prisma: PrismaClient;
  userId: string | null;
  io: any;
}

export const resolvers = {
  Query: {
    events: async (_: any, __: any, { prisma }: Context) => {
      return prisma.event.findMany({ include: { attendees: true } });
    },
    me: async (_: any, __: any, { prisma, userId }: Context) => {
      return userId ? await prisma.user.findUnique({ where: { id: userId } }) : null;
    },
    hello: () => 'Hello World',
  },

  Mutation: {
    joinEvent: async (
      _: any,
      { eventId }: { eventId: string },
      { prisma, userId, io }: Context
    ) => {
      if (!userId) throw new Error('Not authenticated');

      // Prevent duplicate join if already an attendee
      const existing = await prisma.event.findFirst({
        where: {
          id: eventId,
          attendees: {
            some: { id: userId },
          },
        },
      });

      if (existing) {
        return await prisma.event.findUnique({
          where: { id: eventId },
          include: { attendees: true },
        });
      }

      const updatedEvent = await prisma.event.update({
        where: { id: eventId },
        data: {
          attendees: { connect: { id: userId } },
        },
        include: { attendees: true },
      });

      // Emit real-time updates
      io.to(`event-${eventId}`).emit('userJoined', updatedEvent.attendees);
      io.to(`event-${eventId}`).emit('participantCount', updatedEvent.attendees.length);

      return updatedEvent;
    },

    leaveEvent: async (
      _: any,
      { eventId }: { eventId: string },
      { prisma, userId, io }: Context
    ) => {
      if (!userId) throw new Error('Not authenticated');

      const updatedEvent = await prisma.event.update({
        where: { id: eventId },
        data: {
          attendees: {
            disconnect: { id: userId },
          },
        },
        include: { attendees: true },
      });

      // Emit real-time updates
      io.to(`event-${eventId}`).emit('userLeft', updatedEvent.attendees);
      io.to(`event-${eventId}`).emit('participantCount', updatedEvent.attendees.length);

      return updatedEvent;
    },
  },
};
