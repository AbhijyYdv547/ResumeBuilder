import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { getResumes, generateResume } from "../api/api";

const Dashboard = () => {
    // @ts-ignore
  const { user, logout } = useContext(AuthContext);
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    getResumes(localStorage.getItem("token")).then((res) => setResumes(res.data));
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold">Welcome, {user?.name}</h2>
      <button onClick={logout} className="p-2 bg-red-500 text-white">Logout</button>
      <h3 className="mt-6">Your Resumes</h3>
      <ul>
        {resumes.map((resume) => (
            // @ts-ignore
          <li key={resume._id}>{resume.aiResponse}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
