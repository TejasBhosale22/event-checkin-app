import express from 'express';
import http from 'http';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import { schema } from './schema';
import { createContext } from './context';
import { setupSocket } from './socket';
import { generateMockToken } from './auth'; // ✅ ADD THIS
import 'dotenv/config';

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json()); // ✅ ADD THIS to parse JSON bodies

// ✅ MOCK LOGIN ROUTE
app.post('/mock-login', (req, res) => {
  const { email } = req.body;
  const user =
    email === 'alice@example.com'
      ? { id: '1', name: 'Alice', email }
      : { id: '2', name: 'Bob', email };

  const token = generateMockToken(email, process.env.JWT_SECRET!);
  res.json({ token, user });
});

app.get('/health', (_req, res) => {
  res.send('OK');
});

const apolloServer = new ApolloServer({
  schema,
  context: createContext,
});

async function start() {
  try {
    await apolloServer.start();
    apolloServer.applyMiddleware({ app: app as any });

    const io = setupSocket(server);
    app.set('io', io);

    const PORT = process.env.PORT || 4000;
    server.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`);
    });

    process.on('SIGINT', async () => {
      console.log('\n🛑 Gracefully shutting down...');
      await apolloServer.stop();
      server.close(() => {
        console.log('🧹 HTTP server closed');
        process.exit(0);
      });
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
  }
}

start();
