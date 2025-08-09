import ResumeTemplateClassic from "./ResumeTemplateClassic";
import ResumeTemplateModern from "./ResumeTemplateModern";
import ResumeTemplateCompact from "./ResumeTemplateCompact";
import { BlobProvider } from "@react-pdf/renderer";
import { Resume } from "@/types/ResumeTypes";


export const PdfViewer = ({
    resume,
    template,
}: {
    resume: Resume;
    template: string;
}) => {
    const getTemplateComponent = () => {
        switch (template) {
            case "modern":
                return <ResumeTemplateModern resume={resume} />;
            case "compact":
                return <ResumeTemplateCompact resume={resume} />;
            default:
                return <ResumeTemplateClassic resume={resume} />;
        }
    };

    return (
        <BlobProvider document={getTemplateComponent()}>
            {({ url, loading }) =>
                loading ? (
                    <button
                        className="px-4 py-2 bg-gray-400 text-white font-semibold rounded-md shadow"
                        disabled
                    >
                        Generating...
                    </button>
                ) : (
                    <a
                        href={url!}
                        download="resume.pdf"
                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600"
                    >
                        Download PDF
                    </a>
                )
            }
        </BlobProvider>
    );
};
