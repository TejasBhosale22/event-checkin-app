# event-checkin-app
A real-time event attendance system built with:

- 📱 React Native (Expo)
- 🧠 Zustand + TanStack Query
- 🧩 GraphQL API with Node.js
- 💬 Socket.io for live updates
- 🗃️ PostgreSQL + Prisma

## 🛠️ Setup

### Backend

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev

