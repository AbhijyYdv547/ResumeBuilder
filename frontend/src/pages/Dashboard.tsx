import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  const navigate = useNavigate();

  // Fetch resumes when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:3000/api/resumes", {
        headers: { Authorization: token },
      })
      .then((res) => {
        setResumes(res.data)
        console.log(resumes)
      }
    )
      .catch((err) => console.error("Error fetching resumes:", err));
  }, []);

  // Logout function (removes token and redirects)
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      {/* Header */}
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Welcome, 👋</h2>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600 transition duration-200"
        >
          Logout
        </button>
      </div>

      {/* Resume List */}
      <div className="w-full max-w-4xl mt-8">
        <h3 className="text-xl font-semibold text-gray-800">Your Resumes</h3>

        {resumes.length > 0 ? (
          <ul className="mt-4 space-y-4">
            {resumes.map((resume) => (
              // @ts-ignore
              <li key={resume._id} className="p-4 bg-white rounded-lg shadow">
                <h4 className="font-bold text-gray-900">Generated Resume:</h4>
                
                <p className="text-gray-700 mt-2">{resume.aiResponse}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-4">No resumes found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
