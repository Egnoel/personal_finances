# 💰 Personal Finance Dashboard

A full-featured personal finance dashboard built with a modern tech stack. Includes authentication, dynamic filters, charts, CSV export, and a responsive UI. Designed to showcase fullstack development skills.

---

## 🔧 Tech Stack

**Frontend:**

- React
- Tailwind CSS
- Recharts (or Chart.js)

**Backend:**

- Node.js
- Express
- MongoDB + Mongoose
- JWT (authentication)
- CSV Writer (data export)

---

## ✨ Features

- User registration and login
- Income and expense tracking
- Filters by category, type, and date
- Financial summary cards
- Pie and bar charts for insights
- CSV export of transactions
- Mobile-first responsive design

---

## 📸 Screenshots

| Dashboard View                       |
| ------------------------------------ |
| ![Dashboard Preview](/dashboard.png) |

---

## 🚀 Getting Started Locally

1. Clone the repo

```bash
git clone https://github.com/Egnoel/personal_finances.git
```

```bash
cd personal_finances
```

Install backend dependencies

```bash
cd backend
npm install
```

Create a .env file in /backend with:

env

```bash
PORT=5000
MONGO_URI=your_mongo_connection
JWT_SECRET=your_secret_key
```

Start the backend server

```bash
npm run dev
```

Install frontend dependencies

```bash
cd ../frontend
npm install
```

Start the frontend app

```bash
npm start
```

🌐 Deployment

Backend: Railway or Render

Frontend: Vercel

📁 Project Structure

```bash
/backend
  /controllers
  /models
  /routes
  /middlewares
  /utils
  server.js
/frontend
  /src
    /components
    /pages
    /services
    App.jsx
```

📬 Contact
Built by Egnoel
🔗 linkedin.com/in/egnoel-neto

📧 egnoel@hotmail.com
