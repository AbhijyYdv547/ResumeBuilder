// ResumeTemplateCompact.tsx
import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: { padding: 20, fontSize: 10 },
    name: { fontSize: 14, fontWeight: "bold", marginBottom: 5 },
    sectionTitle: { fontSize: 11, fontWeight: "bold", marginTop: 8 },
    listItem: { marginBottom: 2 },
});

interface Resume {
    name: string,
    email: string,
    phone: string,
    linkedin: string,
    experience: string[],
    skills: string[],
    education: string[],
    projects: string[]
    summary?: string,
}

const ResumeTemplateCompact = ({ resume }: { resume: Resume }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.name}>{resume.name}</Text>
            <Text>{resume.email} | {resume.phone} | {resume.linkedin}</Text>

            {resume.summary && (
                <>
                    <Text style={styles.sectionTitle}>Summary</Text>
                    <Text>{resume.summary}</Text>
                </>
            )}

            <Text style={styles.sectionTitle}>Experience</Text>
            {resume.experience.map((exp: string, i: number) => (
                <Text key={i} style={styles.listItem}>{exp}</Text>
            ))}

            <Text style={styles.sectionTitle}>Education</Text>
            {resume.education.map((edu: string, i: number) => (
                <Text key={i} style={styles.listItem}>{edu}</Text>
            ))}

            <Text style={styles.sectionTitle}>Projects</Text>
            {resume.projects.map((proj: string, i: number) => (
                <Text key={i} style={styles.listItem}>{proj}</Text>
            ))}

            <Text style={styles.sectionTitle}>Skills</Text>
            <Text>{resume.skills.join(", ")}</Text>
        </Page>
    </Document>
);

export default ResumeTemplateCompact;
