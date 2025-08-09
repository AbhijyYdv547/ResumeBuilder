
import { Resume } from '@/types/ResumeTypes';
import { PdfViewer } from './PdfViewer';
import { PDFViewer } from '@react-pdf/renderer';
import ResumeTemplateModern from './ResumeTemplateModern';
import ResumeTemplateClassic from './ResumeTemplateClassic';
import ResumeTemplateCompact from './ResumeTemplateCompact';


const ResumeList = ({ resumes }: { resumes: Resume[] }) => {
    const renderTemplate = ({resume}:{resume:Resume}) => {
        switch (resume.template) {
            case "modern":
                return <ResumeTemplateModern resume={resume} />;
            case "compact":
                return <ResumeTemplateCompact resume={resume} />;
            default:
                return <ResumeTemplateClassic resume={resume} />;
        }
    }

    return (
        <div className="w-full max-w-5xl mt-8">
            {resumes.length > 0 ? (
                <div className="space-y-8">
                    {resumes.map((resume) => {
                        return (
                            <div key={resume.id} className="shadow-lg border rounded-lg flex overflow-hidden">
                                <div className="w-full bg-white p-6">

                                    <PDFViewer height="100%" width="100%" key={resume.id}>
                                        {renderTemplate({resume})}
                                    </PDFViewer>
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