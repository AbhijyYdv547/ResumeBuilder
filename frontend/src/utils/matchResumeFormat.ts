interface Experience {
  jobTitle: string;
  company: string;
  location?: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}

interface Education {
  degree: string,
  institution: string,
  graduationYear: string
}
interface Project {
  name: string,
  description: string,
  technologies: string[]
}

interface Resume {
  id: string;
  template:string,
  aiResponse: string,
  resumeData: {
    name: string;
    email: string;
    phone: string;
    linkedin: string;
    summary: string;
    experience: Experience[];
    skills: string[];
    education: Education[];
    projects: Project[];
  }
}

interface formattedResumeType {
    name: string;
    email: string;
    phone: string;
    linkedin: string;
    summary: string;
    experience: Experience[];
    skills: string[];
    education: Education[];
    projects: Project[];
}



export const matchResumeFormat =({resume}:{resume:Resume}):=>{
    const resumeText = resume.aiResponse || "";
            const nameMatch = resumeText.match(/^#\s*(.+)$/m);
            const phoneMatch = resumeText.match(/\*\*Phone:\*\*\s*([+\d\s-]+)/);
            const emailMatch = resumeText.match(/\*\*Email:\*\*\s*([\w.-]+@[\w.-]+\.\w+)/);
            const linkedinMatch = resumeText.match(/\*\*LinkedIn:\*\*\s*(\S+)/);

            const summaryMatch = resumeText.match(/\*\*📝 Summary\*\*\n([\s\S]*?)(?=\n\*\*|$)/);


            const skillsMatch = resumeText.match(/### \*\*💻 Skills\*\*\n([\s\S]*?)(?=\n###|$)/);
            const experienceMatch = resumeText.match(/### \*\*💼 Work Experience\*\*\n([\s\S]*?)(?=\n###|$)/);
            const educationMatch = resumeText.match(/### \*\*🎓 Education\*\*\n([\s\S]*?)(?=\n###|$)/);
            const projectsMatch = resumeText.match(/### \*\*💡 Projects\*\*\n([\s\S]*?)(?=\n###|$)/);

            // Use extracted data or fallback to structured DB fields
            export const formattedResume:formattedResumeType = {
              name: nameMatch ? nameMatch[1].trim() : resume.resumeData.name || "No Name",
              phone: phoneMatch ? phoneMatch[1].trim() : resume.resumeData.phone || "N/A",
              email: emailMatch ? emailMatch[1].trim() : resume.resumeData.email || "N/A",
              linkedin: linkedinMatch ? linkedinMatch[1].trim() : resume.resumeData.linkedin || "N/A",
              summary: summaryMatch ? summaryMatch[1].trim() : resume.resumeData.summary || "Summary section missing.",
              skills: skillsMatch
                ? skillsMatch[1].split("\n").map((s) => s.replace(/^- /, "").trim()).filter(Boolean)
                : resume.resumeData.skills || [],
              experience: experienceMatch
                ? experienceMatch[1].split(/\n\s*\n/).map((e) => e.trim())
                : resume.resumeData.experience.map((exp) => `**${exp.jobTitle}** at ${exp.company}, ${exp.location} (${exp.startDate} - ${exp.endDate})`),
              education: educationMatch
                ? educationMatch[1].trim()
                : resume.resumeData.education.map((edu) => `${edu.degree} - ${edu.institution} (${edu.graduationYear})`).join("\n"),
              projects: projectsMatch
                ? projectsMatch[1].split(/\n\s*\n/).map((p) => p.trim())
                : resume.resumeData.projects.map((proj) => `**${proj.name}** - ${proj.description} (Tech: ${proj.technologies.join(", ")})`),



               return{
                formattedResume: formattedResumeType
               } 

}}