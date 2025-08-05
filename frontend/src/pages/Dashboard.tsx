import { useNavigate } from "react-router-dom";
import axios from "axios";
import ResumeForm from "../components/ResumeForm";
import Form from "@/components/Form";
import ResizableNav from "@/components/Navbar";

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
        import.meta.env.VITE_BACKEND_URL + "/api/resumes/generate",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("Resume Generated Successfully:", response.data);
      alert("Resume generated successfully!");
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      console.error(
        "Error Generating Resume:",
        error.response?.data || error.message,
      );
      alert("Failed to generate resume.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#262626]">
      {/* ResizableNav at the top */}
      <div className="mb-16">
        <ResizableNav />
      </div>

      {/* Form wrapper */}
      <div className="flex justify-center px-6">
        <div className="w-full max-w-5xl rounded-xl dark:bg-white bg-black p-8 shadow-lg">
          <h1 className="text-xl text-white text-center">
            Fill Form to Generate Resume
          </h1>
          <Form />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
