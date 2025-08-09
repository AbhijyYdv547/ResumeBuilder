import { BackgroundBeams } from "@/components/ui/background-beams";
import { ResizableSide } from "@/components/Sidebar";

import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer";

const Dashboard = () => {
  return (
    <>
      <div className="flex h-screen overflow-hidden bg-[#262626]">
        <ResizableSide />

        <div className="flex-1 overflow-y-auto p-6">

            <Outlet />
            <Footer />

        </div>
      </div>

      <BackgroundBeams />
    </>
  );
};

export default Dashboard;
