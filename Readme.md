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
| POST   | `/api/auth/google`      | Login user using OAuth   |
| POST   | `/api/resumes/generate` | Generate resume data/PDF |
| GET    | `/api/resumes`          | Get all resumes          |
| GET    | `/api/resumes/:id`      | Get specific resume      |
| DELETE | `/api/resumes/:id`      | Delete specific resume   |
| GET    | `/api/profile/`         | Get user's profile       |
| PUT    | `/api/profile/update`   | Update user's profile    |

---

## 📷 Screenshots

<details>
<summary>Landing Page</summary>
<p align="center">
  <img src="https://github.com/user-attachments/assets/b196a58f-ea42-4a21-ae72-efc9195722e7" width="600"/>

</p>
</details>

<details>
<summary>Login and Signup Pages</summary>
<p align="center">
  <img src="https://github.com/user-attachments/assets/1c417ff5-10d9-40fa-af42-53cc10b5eaa4" width="300"/>
  <img src="https://github.com/user-attachments/assets/8f30ba45-bbb1-42e5-8264-1bf9b01fae50" width="300"/>
</p>
</details>

<details>
<summary>Resume Generation Form Dashboard</summary>
<p align="center">
  <img src="https://github.com/user-attachments/assets/7d27a918-34ca-47c9-a5e1-5422172fd7a6" width="600"/>
</p>
</details>

<details>
<summary>Resume Showing Page</summary>
<p align="center">
  <img src="https://github.com/user-attachments/assets/dfe9f277-f5f3-4f23-9702-1704797a3238" width="600"/>
</p>
</details>

<details>
<summary>User Profile Page</summary>
<p align="center">
  <img src="https://github.com/user-attachments/assets/d0b74dbf-ef90-471d-b9d7-c0fe71195d1a" width="600"/>
</p>
</details>


---

## 📬 Contact

Made by **Abhijay Yadav** — feel free to reach out!

Happy shipping! 🚀

