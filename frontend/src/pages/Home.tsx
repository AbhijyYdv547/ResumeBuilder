import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      {/* Hero Section */}
      <div className="max-w-4xl text-center py-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900">
          AI-Powered Resume Builder
        </h1>
        <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
          Create professional resumes effortlessly with AI-generated content and customizable templates.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex justify-center items-center gap-4 mt-6">
          <Button
            variant="primary"
            text="Get Started"
            fullWidth={false}
            loading={false}
            onClick={() => navigate("/register")}
          />
          <Button
            variant="primary"
            text="Login"
            fullWidth={false}
            loading={false}
            onClick={() => navigate("/login")}
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full bg-gradient-to-r from-gray-100 to-gray-200 py-16 px-6 rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800">
          Why Choose Us?
        </h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md transform transition hover:scale-105">
            <h2 className="text-xl font-semibold text-gray-900">
              AI-Generated Resumes
            </h2>
            <p className="text-gray-600 mt-2">
              Let AI craft your resume based on your input.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md transform transition hover:scale-105">
            <h2 className="text-xl font-semibold text-gray-900">
              Download as PDF
            </h2>
            <p className="text-gray-600 mt-2">
              Export and save your resume for job applications.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md transform transition hover:scale-105">
            <h2 className="text-xl font-semibold text-gray-900">
              Multiple Templates
            </h2>
            <p className="text-gray-600 mt-2">
              Choose from different resume designs.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-gray-500 text-sm text-center">
        &copy; 2025 AI Resume Builder. All Rights Reserved.
      </footer>
    </div>
  );
};

export default Home;
