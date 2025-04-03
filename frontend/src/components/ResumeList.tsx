import React from "react";
import PdfViewer from "./PdfViewer";

interface Resume {
  _id: string;
  aiResponse: string;
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  summary:string;
  experience: {
    jobTitle: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    responsibilities: string[];
  }[];
  skills: string[];
  education: {
    degree: string;
    institution: string;
    graduationYear: string;
  }[];
  projects: {
    name: string;
    description: string;
    technologies: string[];
  }[];
}

interface ResumeListProps {
  resumes: Resume[];
}

const ResumeList: React.FC<ResumeListProps> = ({ resumes }) => {
  return (
    <div className="w-full max-w-5xl mt-8">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Your Resumes</h3>

      {resumes.length > 0 ? (
        <div className="space-y-8">
          {resumes.map((resume) => {
            console.log("AI Response from DB:", resume.aiResponse);

            // Extract details from aiResponse (Markdown text)
            const resumeText = resume.aiResponse || "";
            const nameMatch = resumeText.match(/^#\s*(.+)$/m);
            const phoneMatch = resumeText.match(/\*\*Phone:\*\*\s*([\+\d\s-]+)/);
            const emailMatch = resumeText.match(/\*\*Email:\*\*\s*([\w.-]+@[\w.-]+\.\w+)/);
            const linkedinMatch = resumeText.match(/\*\*LinkedIn:\*\*\s*(\S+)/);

            const summaryMatch = resumeText.match(/\*\*📝 Summary\*\*\n([\s\S]*?)(?=\n\*\*|$)/);


            const skillsMatch = resumeText.match(/### \*\*💻 Skills\*\*\n([\s\S]*?)(?=\n###|$)/);
            const experienceMatch = resumeText.match(/### \*\*💼 Work Experience\*\*\n([\s\S]*?)(?=\n###|$)/);
            const educationMatch = resumeText.match(/### \*\*🎓 Education\*\*\n([\s\S]*?)(?=\n###|$)/);
            const projectsMatch = resumeText.match(/### \*\*💡 Projects\*\*\n([\s\S]*?)(?=\n###|$)/);

            // Use extracted data or fallback to structured DB fields
            const formattedResume = {
              name: nameMatch ? nameMatch[1].trim() : resume.name || "No Name",
              phone: phoneMatch ? phoneMatch[1].trim() : resume.phone || "N/A",
              email: emailMatch ? emailMatch[1].trim() : resume.email || "N/A",
              linkedin: linkedinMatch ? linkedinMatch[1].trim() : resume.linkedin || "N/A",
              summary: summaryMatch ? summaryMatch[1].trim() : resume.summary || "Summary section missing.",
              skills: skillsMatch
                ? skillsMatch[1].split("\n").map((s) => s.replace(/^- /, "").trim()).filter(Boolean)
                : resume.skills || [],
              experience: experienceMatch
                ? experienceMatch[1].split(/\n\s*\n/).map((e) => e.trim())
                : resume.experience.map((exp) => `**${exp.jobTitle}** at ${exp.company}, ${exp.location} (${exp.startDate} - ${exp.endDate})`),
              education: educationMatch
                ? educationMatch[1].trim()
                : resume.education.map((edu) => `${edu.degree} - ${edu.institution} (${edu.graduationYear})`).join("\n"),
              projects: projectsMatch
                ? projectsMatch[1].split(/\n\s*\n/).map((p) => p.trim())
                : resume.projects.map((proj) => `**${proj.name}** - ${proj.description} (Tech: ${proj.technologies.join(", ")})`),
            };

            return (
              <div key={resume._id} className="shadow-lg border rounded-lg flex overflow-hidden">
                {/* Left Sidebar */}
                <div className="w-1/3 bg-gray-900 text-white p-6">
                  <h2 className="text-2xl font-bold">{formattedResume.name}</h2>
                  <p className="mt-2">
                    <strong>Phone:</strong> {formattedResume.phone} <br />
                    <strong>Email:</strong> {formattedResume.email} <br />
                    <strong>LinkedIn:</strong>{" "}
                    <a
                      href={formattedResume.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-300 underline"
                    >
                      {formattedResume.linkedin}
                    </a>
                  </p>

                  {/* Skills */}
                  {formattedResume.skills.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-300">Skills</h3>
                      <ul className="mt-2 space-y-1 text-gray-200">
                        {formattedResume.skills.map((skill, index) => (
                          <li key={index} className="flex items-center">
                            🔹 {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Right Content */}
                <div className="w-2/3 bg-white p-6">
                  {/* Summary */}
                  {formattedResume.summary && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Summary</h3>
                      <p className="text-gray-700">{formattedResume.summary}</p>
                    </div>
                  )}

                  {/* Experience */}
                  {formattedResume.experience.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold text-gray-800">Work Experience</h3>
                      {formattedResume.experience.map((exp, index) => (
                        <p key={index} className="text-gray-700 mb-2">📌 {exp}</p>
                      ))}
                    </div>
                  )}

                  {/* Education */}
                  {formattedResume.education && (
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold text-gray-800">Education</h3>
                      <p className="text-gray-700">🎓 {formattedResume.education}</p>
                    </div>
                  )}

                  {/* Projects */}
                  {formattedResume.projects.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold text-gray-800">Projects</h3>
                      {formattedResume.projects.map((project, index) => (
                        <p key={index} className="text-gray-700 mb-2">💡 {project}</p>
                      ))}
                    </div>
                  )}

                  {/* PDF Viewer */}
                  <div className="mt-6">
                    <PdfViewer resume={formattedResume} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500 mt-4">No resumes found.</p>
      )}
    </div>
  );
};

export default ResumeList;
