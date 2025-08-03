import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import  ResizableNav  from "@/components/Navbar";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex flex-col items-center p-6 font-sans">

      <ResizableNav />

      <div className="h-20"></div>

      <section className="w-full max-w-6xl flex flex-col items-center text-center py-24 px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
          Build Stunning Resumes Effortlessly
        </h1>
        <p className="mt-5 text-xl text-gray-300 max-w-2xl">
          Use AI to generate job-winning resumes with customizable templates and instant PDF downloads.
        </p>

        <div className="flex flex-wrap justify-center items-center gap-4 mt-8">
          <Button
            variant="primary"
            text="Try it Free"
            fullWidth={false}
            loading={false}
            onClick={() => navigate("/register")}
          />
        </div>
      </section>

      {/* Feature Section */}
      <section className="w-full bg-gradient-to-br from-gray-100 to-gray-200 py-20 px-4 rounded-xl shadow-inner">
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-800 mb-12">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "AI-Generated Resumes",
              desc: "Let powerful AI craft your resume tailored to your input.",
            },
            {
              title: "Download as PDF",
              desc: "Instantly export your resume and start applying for jobs.",
            },
            {
              title: "Multiple Templates",
              desc: "Switch between clean, creative, and modern designs.",
            },
          ].map(({ title, desc }, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105"
            >
              <h3 className="text-xl font-bold text-gray-900">{title}</h3>
              <p className="text-gray-600 mt-2">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-20 px-4 max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-800 mb-12">
          Loved by Job Seekers Worldwide
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {["Clean UI", "Saves Time", "HR Friendly"].map((tag, i) => (
            <div
              key={i}
              className="bg-white p-6 border rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-800">{tag}</h3>
              <p className="mt-2 text-gray-600">
                “This tool helped me build a resume that got me shortlisted
                within days. Super easy and fast.”
              </p>
              <p className="mt-3 text-sm text-gray-500">— Verified User</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 py-8 text-gray-500 text-sm text-center border-t w-full">
        &copy; {new Date().getFullYear()} ResumeGen. All Rights Reserved.
      </footer>
    </div>
  );
};

export default Home;
