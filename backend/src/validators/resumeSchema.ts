import z from "zod";

export const resumeSchema = z.object({
  fullname: z.string().min(1).min(5).max(15),
  email: z.string().email(),
  phone: z.string().min(10).max(10),
  linkedin: z.string().url(),
  summary: z.string().min(25).max(500),
  skills: z.array(z.string()).min(1),
  experience: z.array(
    z.object({
      jobTitle: z.string(),
      company: z.string(),
      location: z.string(),
      startDate: z.string(),
      endDate: z.string(),
      responsibilities: z.array(z.string()),
    }),
  ),
  education: z.array(
    z.object({
      degree: z.string(),
      institution: z.string(),
      graduationYear: z.string(),
    }),
  ),
  projects: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      technologies: z.string(),
    }),
  ),
  template: z.string(),
});