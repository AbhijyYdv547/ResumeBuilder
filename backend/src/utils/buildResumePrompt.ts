interface Experience{
    jobTitle: string;
  company: string;
  location?: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}

interface Education{
    degree: string,
    institution: string,
    graduationYear:string
}
interface Project{
    name: string,
    description: string,
    technologies:string[]
}

interface BuildResumeProps{
    name:string,
    email:string,
    phone:string,
    linkedin:string,
    experience:Experience[],
    skills:string[],
    education:Education[],
    projects:Project[]
    summary?:string,
}

export const buildResumePrompt = ({name, email, phone, linkedin, experience, skills, education, projects, summary}:BuildResumeProps) : string =>{

    const sanitizedSummary = summary?.trim() || `Generate a compelling summary for ${name}, highlighting their expertise in ${skills.join(", ")}.`;

  const experienceText = experience.length
    ? experience
        .map(
          (exp) => `- **Job Title:** ${exp.jobTitle}  
  - **Company:** ${exp.company}  
  - **Location:** ${exp.location || "N/A"}  
  - **Start Date - End Date:** ${exp.startDate} - ${exp.endDate}  
  - **Key Responsibilities:**  
    ${exp.responsibilities.map((r) => `  - ${r}`).join("\n    ")}`
        )
        .join("\n\n")
    : "No prior work experience, but eager to learn and contribute.";

  const projectsText = projects.length
    ? projects
        .map(
          (proj) => `- **Project Name:** ${proj.name}  
  - **Description:** ${proj.description}  
  - **Technologies Used:** ${proj.technologies.join(", ")}`
        )
        .join("\n\n")
    : "No projects listed."; 
              
const skillsText = skills.map((skill) => `- ${skill}`).join("\n");
    
  const educationText = education.length
    ? education
        .map(
          (edu) => `- **Degree:** ${edu.degree}  
  - **Institution:** ${edu.institution}  
  - **Graduation Year:** ${edu.graduationYear}`
        )
        .join("\n\n")
    : "No education details provided.";

  return `Generate a professional resume in Markdown format for ${name} with these details:

### **📞 Contact Information**
- **Name:** ${name}
- **Email:** ${email}
- **Phone:** ${phone}
- **LinkedIn:** ${linkedin}

### **📝 Summary**
${sanitizedSummary}

### **💻 Skills**
${skillsText}

### **💼 Work Experience**
${experienceText}

### **🎓 Education**
${educationText}

### **💡 Projects**
${projectsText}

### **📌 Additional Notes**
- The response should be structured properly for frontend display.
- Use Markdown formatting for headers, bullet points, and clarity.
`;

}