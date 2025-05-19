# 📝 Resume Builder

A full-stack **Resume Builder** application that allows users to register, log in, fill in their resume details, preview their resume, and download a professional PDF version — all through a clean and intuitive UI. Built using the **MERN stack** (MongoDB, Express.js, React/Next.js, Node.js).

---

## 📁 Project Structure

resume-builder/
├── frontend/ # React or Next.js app (UI)
├── backend/ # Express.js server (API)
├── README.md # You're reading it!
└── .gitignore


---

## 🚀 Features

- 🔐 User authentication (Register/Login with JWT)
- 🧾 Fill and save resume details (name, education, experience, etc.)
- 👁️ Live resume preview as you type
- 📄 Download the resume as a styled PDF
- 🎨 Beautiful and responsive UI
- 📦 RESTful API with MongoDB integration

---

## 🛠️ Tech Stack

### Frontend
- React.js or Next.js
- Tailwind CSS (or Bootstrap)
- Axios (for API calls)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication

---

## ⚙️ Getting Started

### ✅ Prerequisites

- Node.js and npm
- MongoDB (local or cloud like MongoDB Atlas)

---

### 🔧 Installation

#### Clone the Repository

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

## Start the backend server:
npm run dev


## Frontend Setup
cd ../frontend
npm install

## Start the frontend dev server:
npm run dev

Visit the app at http://localhost:3000

## Folder Structure

| Folder     | Description                              |
| ---------- | ---------------------------------------- |
| `frontend` | Contains all React/Next.js frontend code |
| `backend`  | Contains Node.js/Express API + DB logic  |

## API Endpoints(Backend)

| Method | Endpoint        | Description            |
| ------ | --------------- | ---------------------- |
| POST   | `/api/auth/register` | Register a new user    |
| POST   | `/api/auth/login`    | Authenticate user      |
| POST   | `/api/resumes/generate`   | Generate resume data       |
| GET    | `/api/resumes`   | Get user's resume data |
| GET    | `/api/resumes/:id`   | Get user's specific resume |
| DELETE    | `/api/resumes/:id`   | Delete user's specific resume |


## Acknowledgements

React
Express
MongoDB
JWT
Tailwind CSS
Gemini Flash API


📬 Contact
Made by Abhijay yAdav – feel free to reach out!


---

Let me know if you want to:
- Add a deployment section (e.g., Vercel + Render).
- Add Docker setup instructions.
- Customize the resume layout or generation logic (PDF part).
- Add environment variable examples for `.env.example`.

Happy shipping! 🚀
