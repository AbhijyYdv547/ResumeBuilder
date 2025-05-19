
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ResumeForm from "../components/ResumeForm";

const Dashboard = () => {
  const navigate = useNavigate();

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleResumeSubmit = async (data: FormData) => {
    try {
      console.log("Submitting Form Data:", data); 

      const token = localStorage.getItem("token");
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
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Resume Generated Successfully:", response.data);
      alert("Resume generated successfully!");
    } catch (error) {
      console.error("Error Generating Resume:", error.response?.data || error.message);
      alert("Failed to generate resume.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-black flex flex-col items-center justify-center px-6">
      {/* Header Section */}
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl flex justify-between items-center border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome, <span className="text-blue-600 dark:text-blue-400">User 👋</span>
        </h2>
        <button
          onClick={logout}
          className="px-5 py-2 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-900 transition duration-200"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-5xl mt-8 flex flex-col md:flex-row gap-10 items-center md:items-start">
        {/* Resume Form Card */}
        <div className="w-full md:w-3/5 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-300 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Create Your Resume 📄
          </h3>
          <ResumeForm onSubmit={handleResumeSubmit} />
        </div>

        {/* Action Card */}
        <div className="w-full md:w-2/5 flex flex-col gap-6">
          <div
            onClick={() => navigate("/resumes")}
            className="p-5 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-900 transition duration-200 text-center cursor-pointer"
          >
            📂 View Your Resumes
          </div>

          <div className="p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md text-gray-700 dark:text-gray-300 text-center">
            ⚡ **Tip:** Keep your resume updated and precise for better job applications!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
