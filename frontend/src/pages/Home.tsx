import { useNavigate } from "react-router-dom";
import  ResizableNav  from "@/components/Navbar";
import { BackgroundBeams } from "@/components/ui/background-beams";
import MagicButton from "@/components/ui/magic-button";
import { CircleArrowRight, LogIn } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 4000);
      navigate("/login");
    });
  };
  const handleRegister = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 4000);
      navigate("/register");
    });
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center p-6 font-sans">

      <ResizableNav />

      <div className="h-20"></div>

      <section className="w-full max-w-6xl flex flex-col items-center text-center py-24 px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-200 leading-tight">
          Build Stunning Resumes Effortlessly
        </h1>
        <p className="mt-5 text-xl text-gray-200 max-w-2xl">
          Use AI to generate job-winning resumes with customizable templates and instant PDF downloads.
        </p>

        <div className="flex flex-wrap justify-center mt-8 gap-6">
            <MagicButton
              title={"Register"}
            icon={<CircleArrowRight />}
              position="right"
              handleClick={handleRegister}
            />
            <MagicButton
              title={"Login"}
            icon={<LogIn />}
              position="right"
              handleClick={handleLogin}
            />
          
        </div>
      </section>
      <BackgroundBeams/>


    </div>
  );
};

export default Home;
