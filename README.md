# 🚀 ACT Assignment - Full Stack Web Application

## 📌 Project Overview

This is a **Full Stack Web Application** built using:

- **Frontend:** React.js (Create React App)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB

The application allows users to:
- Sign up and log in
- Access a dashboard after authentication
- View dummy data (Leads, Tasks, Users)

---

## 🧱 Project Structure

```
ACT_Assignment/
│
├── Backend/
│   ├── src/
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## ⚙️ Environment Variables

### 🔹 Backend (.env)

```
PORT=3001
saltRounds=10
JWT_SECRET=actassignment
MONGO_URI=your_mongodb_connection_string
```

---

### 🔹 Frontend (.env)

```
REACT_APP_API_URL=http://localhost:3001
```

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/your-username/ACT_Assignment.git
cd ACT_Assignment
```

---

## 🔧 Backend Setup

```
cd Backend
npm install
```

### ▶️ Run Backend

```
npm run dev
```

👉 Server runs at:
```
http://localhost:3001
```

---

## 🎨 Frontend Setup

```
cd frontend
npm install
```

### ▶️ Run Frontend

```
npm start
```

👉 App runs at:
```
http://localhost:3000
```

---

## 🔐 API Endpoints

### Signup
```
POST /v1/user/signup
```

### Login
```
POST /v1/user/login
```

---

## 🧪 How to Test

1. Create a user using Signup API  
2. Login using the same credentials  

Example:

```
POST /v1/user/signup
{
  "firstName": "Test",
  "lastName": "User",
  "emailId": "test@gmail.com",
  "password": "123456"
}
```

---

## ✨ Features

- User Authentication (Signup & Login)
- Password hashing using bcrypt
- Dashboard with dummy data
- Protected routes
- Clean folder structure

---

## 🚀 Deployment

- Backend: Render  
- Frontend: Vercel / Netlify  

---

## 🧠 Tech Stack

- React.js (Create React App)
- Node.js
- Express.js
- MongoDB
- Axios
- bcrypt

---

## 📌 Notes

- Ensure MongoDB URI is configured in backend `.env`
- Backend must be running before frontend
- Use Signup before Login (no default users provided)

---

## 👨‍💻 Author

Ankush Dhiman

---

## ⭐ If you like this project

Give it a ⭐ on GitHub!
