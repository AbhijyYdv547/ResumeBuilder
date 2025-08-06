import { BackgroundBeams } from "@/components/ui/background-beams";
import { ResizableSide } from "@/components/Sidebar";

import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <div className="flex h-screen overflow-hidden bg-[#262626]">
        <ResizableSide />

        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto bg-black p-8 rounded-xl shadow-lg dark:bg-white">
            <Outlet />
          </div>
        </div>
      </div>

      <BackgroundBeams />
    </>
  );
};

export default Dashboard;
