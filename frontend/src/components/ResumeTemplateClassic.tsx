import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

interface Experience {
    jobTitle: string;
    company: string;
    location?: string;
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
    technologies: string[];
}
interface Resume {
    id: string;
    template: string;
    name: string;
    email: string;
    phone: string;
    linkedin: string;
    experience: Experience[];
    skills: string[];
    education: Education[];
    projects: Project[];
    summary?: string;
}

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: "Times-Roman",
        fontSize: 11,
        lineHeight: 1.5,
    },
    header: {
        textAlign: "center",
        marginBottom: 15,
    },
    name: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 4,
    },
    contact: {
        fontSize: 10,
        color: "#444",
    },
    section: {
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: "bold",
        textTransform: "uppercase",
        borderBottom: "1 solid #000",
        paddingBottom: 2,
        marginBottom: 6,
    },
    jobTitle: {
        fontWeight: "bold",
        fontSize: 11,
    },
    company: {
        fontSize: 10,
        fontStyle: "italic",
        marginBottom: 2,
    },
    date: {
        fontSize: 9,
        color: "#555",
        marginBottom: 4,
    },
    listItem: {
        marginLeft: 12,
        marginBottom: 2,
    },
});

const ResumeTemplateClassic = ({ resume }: { resume: Resume }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.name}>{resume.name}</Text>
                <Text style={styles.contact}>
                    {resume.email} | {resume.phone} | {resume.linkedin}
                </Text>
            </View>

            {/* Summary */}
            {resume.summary && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Summary</Text>
                    <Text>{resume.summary}</Text>
                </View>
            )}

            {/* Skills */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Skills</Text>
                <Text>{resume.skills.join(", ")}</Text>
            </View>

            {/* Experience */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Experience</Text>
                {resume.experience.map((exp, i) => (
                    <View key={i} style={{ marginBottom: 8 }}>
                        <Text style={styles.jobTitle}>{exp.jobTitle}</Text>
                        <Text style={styles.company}>{exp.company}</Text>
                        <Text style={styles.date}>
                            {exp.startDate} - {exp.endDate}
                        </Text>
                        {exp.responsibilities.map((res, idx) => (
                            <Text key={idx} style={styles.listItem}>
                                • {res}
                            </Text>
                        ))}
                    </View>
                ))}
            </View>

            {/* Education */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Education</Text>
                {resume.education.map((edu, i) => (
                    <Text key={i}>
                        {edu.degree}, {edu.institution} ({edu.graduationYear})
                    </Text>
                ))}
            </View>

            {/* Projects */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Projects</Text>
                {resume.projects.map((proj, i) => (
                    <View key={i} style={{ marginBottom: 4 }}>
                        <Text style={styles.jobTitle}>{proj.name}</Text>
                        <Text>
                            {proj.description} [{proj.technologies.join(", ")}]
                        </Text>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
);

export default ResumeTemplateClassic;
