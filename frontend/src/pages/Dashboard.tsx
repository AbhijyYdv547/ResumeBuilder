import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ResumeForm from "../components/ResumeForm";
import ResumeList from "../components/ResumeList";

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
        headers: { Authorization: `Bearer ${token}` }, // ✅ Added "Bearer "
      })
      .then((res) => {
        setResumes(res.data);
      })
      .catch((err) => console.error("Error fetching resumes:", err));
  }, []);

  // Logout function (removes token and redirects)
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    console.log("Updated resumes:", resumes); // ✅ Logs after state updates
  }, [resumes]);

const handleResumeSubmit = async (data: FormData) => {
  try {
    console.log("Submitting Resume Data:", data);

    const token = localStorage.getItem("token"); // Get auth token from local storage
    if (!token) {
      alert("User not authenticated!");
      return;
    }

    const response = await axios.post(
      "http://localhost:3000/api/resumes/generate",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Attach token for authentication
        },
      }
    );

    console.log("Resume Generated Successfully:", response.data);
    alert("Resume generated successfully!");

    // If needed, update the state/UI with the new resume
    // Example: setResumes([...resumes, response.data]);

  } catch (error) {
    
    console.error("Error Generating Resume:", error.response?.data || error.message);
    alert("Failed to generate resume.");
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      {/* Header */}
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Welcome,User 👋</h2>
        <button
          onClick={logout}
          className="px-4 py-2 bg-black text-white font-semibold rounded-md shadow-md hover:bg-gray-900 transition duration-200"
        >
          Logout
        </button>
      </div>


     {/* Resume Form */}
      <div className="mt-4">
        <ResumeForm  onSubmit={handleResumeSubmit} />
      </div>


      {/* Resume List */}
       <ResumeList resumes={resumes} />
    </div>
  );
};

export default Dashboard;
