// import { useNavigate } from "react-router-dom";
// import axios from "axios";
import Form from "@/components/Form";
// import ResizableNav from "@/components/Navbar";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { ResizableSide } from "@/components/Sidebar";
// import { ResizableSide } from "@/components/Sidebar";

const Dashboard = () => {
  // const navigate = useNavigate();

  // Logout function
  // const logout = () => {
  //   localStorage.removeItem("token");
  //   navigate("/login");
  // };

  return (
    <>
      <div className="flex h-screen overflow-hidden bg-[#262626]">
        {/* Fixed Sidebar */}
        <ResizableSide />

        {/* Scrollable Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto bg-black p-8 rounded-xl shadow-lg dark:bg-white">
            <h1 className="text-xl text-white text-center mb-4 dark:text-black">
              Fill Form to Generate Resume
            </h1>
            <Form />
          </div>
        </div>
      </div>

      {/* Background Animation (optional if it overlays) */}
      <BackgroundBeams />
    </>
  );
};

export default Dashboard;
