# 📝 Resume Builder — Dockerized

A full-stack **Resume Builder** application that allows users to register, log in, fill in their resume details, preview their resume, and download a professional PDF version — all through a clean and intuitive UI. Built using the **MERN stack** (MongoDB, Express.js, React/Next.js, Node.js).

This version is fully **Dockerized** — both frontend and backend have their own `Dockerfile`s, and you can easily run the whole stack using the provided `docker-compose.yml`.

---

## 🚀 Features

* 🔐 User authentication (JWT)
* 🧾 Fill and save resume details (name, education, experience, etc.)
* 👁️ Live resume preview as you type
* 📄 Download as a styled PDF
* 🎨 Responsive UI (Tailwind CSS)
* 📦 REST API with MongoDB integration
* 🐳 Fully containerized setup

---

## 🛠️ Tech Stack

### Frontend
- React.js or Next.js
- Tailwind CSS (or Bootstrap)
- Axios (for API calls)
- Docker

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication
- Docker

---

## 📁 Project Structure

```
resume-builder/
├── frontend/          # Frontend app
│   ├── Dockerfile
├── backend/           # Backend API
│   ├── Dockerfile
├── docker-compose.yml
└── README.md
```

---

## ⚙️ Setup

### 1️⃣ Local Setup

####  Prerequisites

- Node.js and npm
- MongoDB (local or cloud like MongoDB Atlas)

---

```bash
git clone https://github.com/AbhijyYdv547/resume-builder.git
cd resume-builder

## Backend Setup

cd backend
npm install

## Create a .env file inside backend/ with the following:
GEMINI_API_KEY = your_gemini_api_key
DB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
REACT_APP_URL=http://localhost:5173

## Start the backend server:
npm run dev


## Frontend Setup
cd ../frontend
npm install

## Start the frontend dev server:
npm run dev

Visit the app at http://localhost:5173

```


### 2️⃣ Run with Docker

```bash
## Add secrets in .docker.env file inside backend/ with the following:
GEMINI_API_KEY = your_gemini_api_key
JWT_SECRET=your_jwt_secret_key

# Build and start all services
docker-compose up --build

# Or run in detached mode
docker-compose up -d
```

Frontend → [http://localhost:4173](http://localhost:4173)
Backend API → [http://localhost:3000](http://localhost:3000)

Stop:

```bash
docker-compose down
```

Clear volumes:

```bash
docker-compose down -v
```

---


## 📌 API Endpoints

| Method | Endpoint                | Description              |
| ------ | ----------------------- | ------------------------ |
| POST   | `/api/auth/register`    | Register a user          |
| POST   | `/api/auth/login`       | Login user               |
| POST   | `/api/resumes/generate` | Generate resume data/PDF |
| GET    | `/api/resumes`          | Get all resumes          |
| GET    | `/api/resumes/:id`      | Get specific resume      |
| DELETE | `/api/resumes/:id`      | Delete specific resume   |

---

## 📷 Screenshots

*(Add your existing screenshots here)*

---

## 📬 Contact

Made by **Abhijay Yadav** — feel free to reach out!

Happy shipping! 🚀

