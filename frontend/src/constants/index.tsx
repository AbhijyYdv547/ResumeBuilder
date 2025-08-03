import {
    FileText,
    UserPlus,
    LayoutDashboard,
    Eye,
    Download,
    Database,
    Headset,
    CheckCircle,
} from "lucide-react";

export const navItems = [
  { name: "Features", link: "#features" },
  { name: "FAQ", link: "#faq" },
  { name: "Templates", link: "#templates" },
  { name: "Contact", link: "#contact" },
];


export const features = [
    {
        title: "Professional Resume Generation",
        description: "Generate polished, job-ready resumes with minimal effort.",
        icon: <FileText />,
    },
    {
        title: "User Registration & Authentication",
        description: "Secure login and registration to manage your resumes anytime.",
        icon: <UserPlus />,
    },
    {
        title: "Intuitive Dashboard",
        description: "Easily manage resume sections with a clean, modern UI.",
        icon: <LayoutDashboard />,
    },
    {
        title: "Live Resume Preview",
        description: "See real-time changes as you edit your resume content.",
        icon: <Eye />,
    },
    {
        title: "PDF Download Support",
        description: "Download high-quality, professional resumes in PDF format.",
        icon: <Download />,
    },
    {
        title: "Built on MERN Stack",
        description: "Fast and scalable with MongoDB, Express, React, and Node.",
        icon: <Database />,
    },
    {
        title: "24/7 Support",
        description: "We're always available to help — AI and human support.",
        icon: <Headset />,
    },
    {
        title: "Job-Ready Assurance",
        description: "We ensure your resume meets the latest hiring standards.",
        icon: <CheckCircle />,
    },
];
