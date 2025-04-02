import React from "react";
import { useForm, useFieldArray } from "react-hook-form";

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
  experience: string[];
  skills: string[];
  education: string[];
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
      experience: [""],
      skills: [""],
      education: [""],
      projects: [{ name: "", description: "", technologies: "" }],
    },
  });

const experienceArray = useFieldArray({ control, name: "experience" });
  const skillsArray = useFieldArray({ control, name: "skills" });
  const educationArray = useFieldArray({ control, name: "education" });
  const projectsArray = useFieldArray({ control, name: "projects" });



  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create Your Resume</h2>

      {/* Name */}
      <label className="block text-gray-700 font-semibold">Full Name</label>
      <input {...register("name", { required: "Name is required" })} className="input-field" placeholder="John Doe" />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}

      {/* Email */}
      <label className="block text-gray-700 font-semibold mt-3">Email</label>
      <input {...register("email", { required: "Email is required" })} className="input-field" type="email" placeholder="john.doe@email.com" />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      {/* Phone */}
      <label className="block text-gray-700 font-semibold mt-3">Phone</label>
      <input {...register("phone", { required: "Phone number is required" })} className="input-field" placeholder="(123) 456-7890" />
      {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

      {/* LinkedIn */}
      <label className="block text-gray-700 font-semibold mt-3">LinkedIn Profile</label>
      <input {...register("linkedin", { required: "LinkedIn profile is required" })} className="input-field" type="url" placeholder="https://linkedin.com/in/johndoe" />
      {errors.linkedin && <p className="text-red-500">{errors.linkedin.message}</p>}

      {/* Experience (Dynamic) */}
      <h3 className="text-lg font-semibold mt-5">Experience</h3>
      {experienceArray.fields.map((field, index) => (
        <div key={field.id} className="flex gap-2 items-center">
          <input {...register(`experience.${index}`, { required: true })} className="input-field" placeholder="Software Developer at XYZ" />
          <button type="button" className="text-red-500" onClick={() => experienceArray.remove(index)}>❌</button>
        </div>
      ))}
      <button type="button" className="btn-add" onClick={() => experienceArray.append("")}>+ Add Experience</button>

      {/* Skills (Dynamic) */}
      <h3 className="text-lg font-semibold mt-5">Skills</h3>
      {skillsArray.fields.map((field, index) => (
        <div key={field.id} className="flex gap-2 items-center">
          <input {...register(`skills.${index}`, { required: true })} className="input-field" placeholder="React, Node.js" />
          <button type="button" className="text-red-500" onClick={() => skillsArray.remove(index)}>❌</button>
        </div>
      ))}
      <button type="button" className="btn-add" onClick={() => skillsArray.append("")}>+ Add Skill</button>

      {/* Education (Dynamic) */}
      <h3 className="text-lg font-semibold mt-5">Education</h3>
      {educationArray.fields.map((field, index) => (
        <div key={field.id} className="flex gap-2 items-center">
          <input {...register(`education.${index}`, { required: true })} className="input-field" placeholder="B.Tech in Computer Science" />
          <button type="button" className="text-red-500" onClick={() => educationArray.remove(index)}>❌</button>
        </div>
      ))}
      <button type="button" className="btn-add" onClick={() => educationArray.append("")}>+ Add Education</button>

      {/* Projects (Dynamic) */}
      <h3 className="text-lg font-semibold mt-5">Projects</h3>
      {projectsArray.fields.map((field, index) => (
        <div key={field.id} className="border p-2 rounded-md mb-2">
          <input {...register(`projects.${index}.name`, { required: true })} className="input-field" placeholder="Project Name" />
          <input {...register(`projects.${index}.description`, { required: true })} className="input-field mt-1" placeholder="Short project description" />
          <input {...register(`projects.${index}.technologies`, { required: true })} className="input-field mt-1" placeholder="Tech stack used (React, Node.js)" />
          <button type="button" className="text-red-500 mt-1" onClick={() => projectsArray.remove(index)}>❌ Remove Project</button>
        </div>
      ))}
      <button type="button" className="btn-add" onClick={() => projectsArray.append({ name: "", description: "", technologies: "" })}>+ Add Project</button>

      {/* Submit Button */}
      <button type="submit" className="btn-submit mt-5">Generate Resume</button>
    </form>
  );
};

export default ResumeForm;
