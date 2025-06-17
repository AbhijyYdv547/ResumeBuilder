import { useForm, useFieldArray } from "react-hook-form";

interface Experience {
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}

interface Education {
  degree: string;
  institution: string;
  graduationYear: string;
}

interface Project {
  name: string;
  description: string;
  technologies: string;
}

interface FormData {
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

const ResumeForm: React.FC<{ onSubmit: (data: FormData) => void }> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      summary: "",
      experience: [{ jobTitle: "", company: "", location: "", startDate: "", endDate: "", responsibilities: [""] }],
      skills: [""],
      education: [{ degree: "", institution: "", graduationYear: "" }],
      projects: [{ name: "", description: "", technologies: "" }],
    },
  });

  const experienceArray = useFieldArray({ control, name: "experience" });
  const skillsArray = useFieldArray({
    control,
    name: "skills",
  });
  const educationArray = useFieldArray({ control, name: "education" });
  const projectsArray = useFieldArray({ control, name: "projects" });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create Your Resume</h2>

      <label className="block text-gray-700 font-semibold">Full Name</label>
      <input {...register("name", { required: "Name is required" })} className="input-field" placeholder="John Doe" />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}

      <label className="block text-gray-700 font-semibold mt-3">Email</label>
      <input {...register("email", { required: "Email is required" })} className="input-field" type="email" placeholder="john.doe@email.com" />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <label className="block text-gray-700 font-semibold mt-3">Phone</label>
      <input {...register("phone", { required: "Phone number is required" })} className="input-field" placeholder="(123) 456-7890" />
      {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

      <label className="block text-gray-700 font-semibold mt-3">LinkedIn Profile</label>
      <input {...register("linkedin", { required: "LinkedIn profile is required" })} className="input-field" type="url" placeholder="https://linkedin.com/in/johndoe" />
      {errors.linkedin && <p className="text-red-500">{errors.linkedin.message}</p>}

      <label className="block text-gray-700 font-semibold mt-3">Summary</label>
      <textarea
        {...register("summary", { required: "Summary is required" })}
        className="input-field h-24 resize-none"
        placeholder="A brief summary about yourself..."
      />
      {errors.summary && <p className="text-red-500">{errors.summary.message}</p>}

      <h3 className="text-lg font-semibold mt-5">Work Experience</h3>
      {experienceArray.fields.map((field, index) => (
        <div key={field.id} className="border p-4 rounded-md mb-3">
          <input {...register(`experience.${index}.jobTitle`)} className="input-field" placeholder="Software Developer Intern" />
          <input {...register(`experience.${index}.company`)} className="input-field mt-2" placeholder="Company Name" />
          <input {...register(`experience.${index}.location`)} className="input-field mt-2" placeholder="Location (Optional)" />
          <div className="flex gap-2 mt-2">
            <input {...register(`experience.${index}.startDate`)} type="date" className="input-field" />
            <input {...register(`experience.${index}.endDate`)} type="date" className="input-field" />
          </div>

          <h4 className="text-md font-semibold mt-2">Responsibilities</h4>
          <ul>
            {field.responsibilities.map((_, respIndex) => (
              <li key={respIndex} className="flex items-center gap-2">
                <input {...register(`experience.${index}.responsibilities.${respIndex}`)} className="input-field mt-1" placeholder="e.g., Developed features in React.js" />
              </li>
            ))}
          </ul>

          <button type="button" className="text-red-500 mt-2" onClick={() => experienceArray.remove(index)}>❌ Remove Experience</button>
        </div>
      ))}
      <button type="button" className="btn-add" onClick={() => experienceArray.append({ jobTitle: "", company: "", location: "", startDate: "", endDate: "", responsibilities: [""] })}>
        + Add Another Experience
      </button>

       <h3 className="text-lg font-semibold mt-5">Skills</h3>
      {skillsArray.fields.map((field, index) => (
  <div key={field.id} className="flex gap-2 items-center mt-2">
    <input
      {...register(`skills.${index}`, { required: true })}
      className="input-field"
      placeholder="React, Node.js"
    />
    <button type="button" className="text-red-500" onClick={() => skillsArray.remove(index)}>
      ❌
    </button>
  </div>
))}
<button type="button" className="btn-add mt-2" onClick={() => skillsArray.append({ name: "" })}>
  + Add Skill
</button>

      <h3 className="text-lg font-semibold mt-5">Education</h3>
      {educationArray.fields.map((field, index) => (
        <div key={field.id} className="border p-4 rounded-md mb-3">
          <input {...register(`education.${index}.degree`)} className="input-field" placeholder="B.Tech in Computer Science" />
          <input {...register(`education.${index}.institution`)} className="input-field mt-2" placeholder="Example University" />
          <input {...register(`education.${index}.graduationYear`)} className="input-field mt-2" placeholder="2023" />
          <button type="button" className="text-red-500 mt-2" onClick={() => educationArray.remove(index)}>❌ Remove Education</button>
        </div>
      ))}
      <button type="button" className="btn-add" onClick={() => educationArray.append({ degree: "", institution: "", graduationYear: "" })}>+ Add Education</button>

      <h3 className="text-lg font-semibold mt-5">Projects</h3>
      {projectsArray.fields.map((field, index) => (
        <div key={field.id} className="border p-4 rounded-md mb-3">
          <input {...register(`projects.${index}.name`)} className="input-field" placeholder="Project Name" />
          <input {...register(`projects.${index}.description`)} className="input-field mt-1" placeholder="Project Description" />
          <input {...register(`projects.${index}.technologies`)} className="input-field mt-1" placeholder="React, Node.js" />
          <button type="button" className="text-red-500 mt-2" onClick={() => projectsArray.remove(index)}>❌ Remove Project</button>
        </div>
      ))}
      <button type="button" className="btn-add" onClick={() => projectsArray.append({ name: "", description: "", technologies: "" })}>+ Add Project</button>

      <button type="submit" className="btn-submit mt-5">Generate Resume</button>
    </form>
  );
};

export default ResumeForm;
