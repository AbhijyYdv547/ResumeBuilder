import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      {/* Header */}
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Welcome, 👋</h2>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600 transition duration-200"
        >
          Logout
        </button>
      </div>

      {/* Resume List */}
      <div className="w-full max-w-4xl mt-8">
        <h3 className="text-xl font-semibold text-gray-800">Your Resumes</h3>

        {resumes.length > 0 ? (
          <div className="mt-4 space-y-6">
            {resumes.map((resume) => {
              const resumeText = resume.aiResponse || "";
              console.log("Full Resume Text:", resumeText); // Debugging Log

              // Extract details using REGEX (Fixed Experience)
              const nameMatch = resumeText.match(/\*\*(.*?)\*\*/);
              const contactMatch = resumeText.match(/\*\*(.*?)\*\*\s\((.*?)\)\s\|\s(.*?)\s\|\s(.*)/);
              const summaryMatch = resumeText.match(/\*\*Summary\*\*\s([\s\S]*?)\n\*\*/);
              const skillsMatch = resumeText.match(/\*\*Skills\*\*\s([\s\S]*?)\n\*\*/);
              const experienceMatch = resumeText.match(/\*\*Experience\*\*\s([\s\S]*?)(?=\n\*\*|$)/);
              const educationMatch = resumeText.match(/\*\*Education\*\*\s([\s\S]*)/);

              console.log("Extracted Experience:", experienceMatch ? experienceMatch[1] : "Not Found"); // Debugging Log

              return (
                <div key={resume._id} className="p-6 bg-white rounded-lg shadow-md border">
                  {/* Name & Contact */}
                  <h2 className="text-2xl font-bold text-gray-900">{nameMatch ? nameMatch[1] : "No Name"}</h2>
                  {contactMatch && (
                    <p className="text-gray-700">
                      {contactMatch[2]} | {contactMatch[3]} | {contactMatch[4]}
                    </p>
                  )}

                  {/* Resume Sections */}
                  <div className="mt-4 space-y-3">
                    {summaryMatch && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">Summary</h3>
                        <p className="text-gray-700">{summaryMatch[1].trim()}</p>
                      </div>
                    )}

                    {skillsMatch && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">Skills</h3>
                        <ul className="list-disc pl-6 text-gray-700">
                          {skillsMatch[1]
                            .split("\n")
                            .map((skill, index) => skill.trim() && <li key={index}>{skill}</li>)}
                        </ul>
                      </div>
                    )}

                    {experienceMatch && experienceMatch[1].trim() ? (
  <div>
    <h3 className="text-lg font-semibold text-gray-800">Experience</h3>
    {experienceMatch[1]
      .split("\n")
      .map((exp, index) =>
        exp.trim() ? (
          <p key={index} className="text-gray-700 mb-2">{exp}</p>
        ) : null
      )}
  </div>
) : (
  <div>
    <h3 className="text-lg font-semibold text-gray-800">Experience</h3>
    <p className="text-gray-500">No experience details available.</p>
  </div>
)}

                    {educationMatch && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">Education</h3>
                        <p className="text-gray-700">{educationMatch[1].trim()}</p>
                      </div>
                    )}
                  </div>

                  {/* Download Button (Future Enhancement) */}
                  <div className="mt-4">
                    <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition duration-200">
                      Download PDF
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 mt-4">No resumes found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
