
import { PdfViewer } from './PdfViewer';
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
    id:string,
    template:string,
    name: string,
    email: string,
    phone: string,
    linkedin: string,
    experience: Experience[],
    skills: string[],
    education: Education[],
    projects: Project[]
    summary?: string,
}


const ResumeList = ({ resumes }: { resumes: Resume[] }) => {
    return (
        <div className="w-full max-w-5xl mt-8">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Your Resumes</h3>

            {resumes.length > 0 ? (
                <div className="space-y-8">
                    {resumes.map((resume) => {
                        return (
                            <div key={resume.id} className="shadow-lg border rounded-lg flex overflow-hidden">
                                <div className="w-2/3 bg-white p-6">
                                    <div className="mt-6">
                                        <PdfViewer resume={resume} template={resume.template} />
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
)}

export default ResumeList