
import { Resume } from '@/types/ResumeTypes';
import { PdfViewer } from './PdfViewer';



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