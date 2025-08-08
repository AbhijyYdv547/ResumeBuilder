// ResumeTemplateModern.tsx
import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: { padding: 30, fontSize: 12, fontFamily: "Helvetica" },
    header: { fontSize: 22, fontWeight: "bold", marginBottom: 10, color: "#2563eb" },
    contact: { fontSize: 10, marginBottom: 10 },
    sectionTitle: { fontSize: 14, marginTop: 12, marginBottom: 6, color: "#1e40af" },
    listItem: { marginBottom: 4 },
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

const ResumeTemplateModern = ({ resume }: { resume: Resume }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.header}>{resume.name}</Text>
            <Text style={styles.contact}>{resume.email} | {resume.phone} | {resume.linkedin}</Text>

            {resume.summary && (
                <>
                    <Text style={styles.sectionTitle}>📝 Summary</Text>
                    <Text>{resume.summary}</Text>
                </>
            )}

            <Text style={styles.sectionTitle}>💼 Experience</Text>
            {resume.experience.map((exp: string, i: number) => (
                <Text key={i} style={styles.listItem}>{exp}</Text>
            ))}

            <Text style={styles.sectionTitle}>🎓 Education</Text>
            {resume.education.map((edu: string, i: number) => (
                <Text key={i} style={styles.listItem}>{edu}</Text>
            ))}

            <Text style={styles.sectionTitle}>💡 Projects</Text>
            {resume.projects.map((proj: string, i: number) => (
                <Text key={i} style={styles.listItem}>{proj}</Text>
            ))}

            <Text style={styles.sectionTitle}>💻 Skills</Text>
            <Text>{resume.skills.join(", ")}</Text>
        </Page>
    </Document>
);

export default ResumeTemplateModern;
