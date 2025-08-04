import { useNavigate } from "react-router-dom";
import  ResizableNav  from "@/components/Navbar";
import { BackgroundBeams } from "@/components/ui/background-beams";
import MagicButton from "@/components/ui/magic-button";
import { CircleArrowRight, LogIn } from "lucide-react";
import { FeaturesSection } from "@/components/ui/feature-section";
import { FaqSection } from "@/components/ui/faq-section";
import { motion } from "motion/react";

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

        <div className="flex flex-wrap justify-center mt-8 gap-6 z-0">
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

      <section className="w-full max-w-6xl flex flex-col items-center text-center py-24 px-6" id="features">
                    <motion.div
                        className="text-center space-y-4 px-4"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <span className="uppercase text-lg tracking-widest text-gray-200 font-semibold">
                            Features Section
                        </span>
                        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-200">
                            Features <span className="text-green-400"> Of </span> Resume Builder
                        </h2>
                    </motion.div>
        <FeaturesSection />
      </section>

      <section className="w-full max-w-6xl flex flex-col items-center text-center py-24 px-6" id="faq">
        <FaqSection/>
      </section>


    </div>
  );
};

export default Home;
