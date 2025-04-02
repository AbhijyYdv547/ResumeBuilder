import React from "react";
import PdfViewer from "./PdfViewer";

interface Resume {
  _id: string;
  aiResponse: string;
}

interface ResumeListProps {
  resumes: Resume[];
}

const ResumeList: React.FC<ResumeListProps> = ({ resumes }) => {
  return (
    <div className="w-full max-w-4xl mt-8">
      <h3 className="text-xl font-semibold text-gray-800">Your Resumes</h3>

      {resumes.length > 0 ? (
        <div className="mt-4 space-y-6">
          {resumes.map((resume) => {
            const resumeText = resume.aiResponse || "";
            console.log("AI Response from DB:", resumeText); // ✅ Debugging log

            // 🔹 **Extract Name** (First header line)
            const nameMatch = resumeText.match(/^#\s*(.+)$/m);
            
            // 🔹 **Extract Contact Information**
            const phoneMatch = resumeText.match(/\* \*\*Phone:\*\*\s*([\+\d\s-]+)/);
            const emailMatch = resumeText.match(/\* \*\*Email:\*\*\s*([\w.-]+@[\w.-]+\.\w+)/);
            const linkedinMatch = resumeText.match(/\* \*\*LinkedIn:\*\*\s*(\S+)/);

            // 🔹 **Extract Summary**
const summaryMatch = resumeText.match(/## Summary\s*([\s\S]*?)(?=\n##|$)/);
const summary = summaryMatch ? summaryMatch[1].trim() : "";


            // 🔹 **Extract Skills**
const skillsMatch = resumeText.match(/## Skills\s*([\s\S]*?)(?=\n##|$)/);
const skills = skillsMatch ? skillsMatch[1].split("\n").map((s) => s.trim()).filter(Boolean) : [];


            // 🔹 **Extract Experience (Skip placeholder entries)**
const experienceMatch = resumeText.match(/## Experience\s*([\s\S]*?)(?=\n##|$)/);
let experienceText = experienceMatch ? experienceMatch[1].trim() : "";
let experienceList = experienceText.split(/\n\s*\n/).map((e) => e.trim()).filter(Boolean);


            // 🔹 **Extract Education**
const educationMatch = resumeText.match(/## Education\s*([\s\S]*?)(?=\n##|$)/);
const education = educationMatch ? educationMatch[1].trim() : "N/A";

            // 🔹 **Extract Projects**
const projectsMatch = resumeText.match(/## Projects\s*([\s\S]*?)(?=\n##|$)/);
let projectsText = projectsMatch ? projectsMatch[1].trim() : "";
let projectsList = projectsText.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);


            // ✅ Debugging Extracted Data
            console.log("Extracted Name:", nameMatch ? nameMatch[1] : "Not Found");
            console.log("Extracted Phone:", phoneMatch ? phoneMatch[1] : "Not Found");
            console.log("Extracted Email:", emailMatch ? emailMatch[1] : "Not Found");
            console.log("Extracted LinkedIn:", linkedinMatch ? linkedinMatch[1] : "Not Found");
            console.log("Extracted Experience:", experienceList);
            console.log("Extracted Projects:", projectsList);

            // **Formatted Resume Object**
            const formattedResume = {
              name: nameMatch ? nameMatch[1].trim() : "No Name",
              phone: phoneMatch ? phoneMatch[1].trim() : "N/A",
              email: emailMatch ? emailMatch[1].trim() : "N/A",
              linkedin: linkedinMatch ? linkedinMatch[1].trim() : "N/A",
              summary: summaryMatch ? summaryMatch[1].trim() : "",
              skills: skillsMatch ? skillsMatch[1].split("\n").map((s) => s.trim()).filter(Boolean) : [],
              experience: experienceList,
              education: educationMatch ? educationMatch[1].trim() : "N/A",
              projects: projectsList,
            };

            return (
              <div key={resume._id} className="p-6 bg-white rounded-lg shadow-md border">
                {/* Name & Contact */}
                <h2 className="text-2xl font-bold text-gray-900">{formattedResume.name}</h2>
                <p className="text-gray-700">
                  <strong>Phone:</strong> {formattedResume.phone} |  
                  <strong>Email:</strong> {formattedResume.email} |  
                  <strong>LinkedIn:</strong> <a href={formattedResume.linkedin} target="_blank" className="text-blue-500 hover:underline">{formattedResume.linkedin}</a>
                </p>

                {/* Resume Sections */}
                <div className="mt-4 space-y-3">
                  {formattedResume.summary && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Summary</h3>
                      <p className="text-gray-700">{formattedResume.summary}</p>
                    </div>
                  )}

                  {formattedResume.skills.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Skills</h3>
                      <ul className="list-disc pl-6 text-gray-700">
                        {formattedResume.skills.map((skill, index) => <li key={index}>{skill}</li>)}
                      </ul>
                    </div>
                  )}

                  {formattedResume.experience.length > 0 ? (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Experience</h3>
                      {formattedResume.experience.map((exp, index) => (
                        <p key={index} className="text-gray-700 mb-2">{exp}</p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No experience details available.</p>
                  )}

                  {formattedResume.projects.length > 0 ? (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Projects</h3>
                      {formattedResume.projects.map((project, index) => (
                        <p key={index} className="text-gray-700 mb-2">{project}</p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No projects available.</p>
                  )}

                  {formattedResume.education && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Education</h3>
                      <p className="text-gray-700">{formattedResume.education}</p>
                    </div>
                  )}
                </div>

                {/* Download PDF Button */}
                <div className="mt-4">
                  <PdfViewer resume={formattedResume} />
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
