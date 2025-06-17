import { useEffect, useState } from 'react'
import ResumeList from '../components/ResumeList'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const ResumeShow = () => {
  const [resumes, setResumes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
    .get( import.meta.env.VITE_BACKEND_URL + "/api/resumes", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setResumes(res.data);
      })
      .catch((err) => console.error("Error fetching resumes:", err));
  }, []);


  useEffect(() => {
    console.log("Updated resumes:", resumes);
  }, [resumes]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-black flex flex-col items-center px-6 py-10">
    
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-2 px-5 py-2 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-900 transition duration-200"
      >
        🔙 Go Back
      </button>

      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-6 mb-8">
        📜 Your Resumes
      </h2>


      <div className="w-full max-w-6xl">

        <ResumeList resumes={resumes} />
      </div>
    </div>
  )
}

export default ResumeShow