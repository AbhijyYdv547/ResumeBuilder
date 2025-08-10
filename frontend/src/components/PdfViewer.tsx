import ResumeTemplateClassic from "./ResumeTemplateClassic";
import ResumeTemplateModern from "./ResumeTemplateModern";
import ResumeTemplateCompact from "./ResumeTemplateCompact";
import { BlobProvider } from "@react-pdf/renderer";
import { Resume } from "@/types/ResumeTypes";
import { Download, Trash } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";



export const PdfViewer = ({
    resume,
    template,
    onDelete
}: {
    resume: Resume;
    template: string;
        onDelete?: (id: string) => void;
}) => {

    const navigate = useNavigate();

    const delFunc = ()=>{

        if (!resume?.id) {
            console.error("Resume ID is missing!");
            return;
        }
    
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }
        
        axios
        .delete(import.meta.env.VITE_BACKEND_URL + `/api/resumes/${resume.id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
            onDelete?.(resume.id);
            toast({
                title: "Resume Deleted",
                variant: "default",
            });
        })
        .catch((err) => {
            console.log(err);
            toast({
                title: "Resume Couln't be deleted",
                variant: "destructive",
            });
        });

    }


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
                    <div className="flex justify-between items-center ">
                    <div
                        onClick={delFunc}
                        className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md shadow hover:bg-red-600"
                    >
                        <Trash />
                    </div>
                    <a
                        href={url!}
                                onClick={() => toast({
                                    title: "Resume getting downloaded",
                                    variant: "default",
                                })}
                        download="resume.pdf"
                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600"
                    >
                        <Download />
                    </a>
                        </div>
                )
            }
        </BlobProvider>
    );
};
