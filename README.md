# 📲 Event Check-In App

A real-time event check-in application built with React Native (Expo) for the frontend and Node.js (GraphQL, Prisma, and Socket.IO) for the backend. It allows users to join and leave events, with participant counts updated live.

---

## ⚙️ Tech Stack

- **Frontend**: React Native (Expo), Zustand, TanStack Query
- **Backend**: Node.js, GraphQL, Prisma ORM, Socket.IO
- **Database**: PostgreSQL
- **State Management**: Zustand + TanStack Query
- **Real-Time**: WebSockets via Socket.IO

---

## 📁 Project Structure

```text
event-checkin-app/
├── backend/        # Node.js + GraphQL + Prisma
├── frontend/       # React Native (Expo)
└── README.md



---

## 📦 Installation & Setup Instructions

### 🔧 Backend Setup

1. Navigate to the backend folder:

   ```bash
   cd backend
   npm install
   npx prisma migrate dev --name init
   npm run dev
   
Create a .env file in /backend:
DATABASE_URL=postgresql://<username>:<password>@localhost:5432/<your-database-name>
JWT_SECRET=your_secret_key

   
## 📱 Frontend Setup

2.Navigation to the frontend folder:

```bash
cd frontend
npm install
npx expo start
Email: bob@example.com , alice@example.com





