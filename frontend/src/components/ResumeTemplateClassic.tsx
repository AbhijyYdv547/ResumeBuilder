// ResumeTemplateClassic.tsx
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: { flexDirection: "row", fontSize: 12 },
    sidebar: {
        width: "30%",
        backgroundColor: "#1a202c",
        color: "white",
        padding: 20,
    },
    main: { width: "70%", padding: 20 },
    sectionTitle: { fontSize: 14, marginBottom: 6, marginTop: 12, fontWeight: "bold" },
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

const ResumeTemplateClassic = ({ resume }: { resume: Resume }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.sidebar}>
                <Text style={{ fontSize: 16, marginBottom: 10 }}>{resume.name}</Text>
                <Text>{resume.email}</Text>
                <Text>{resume.phone}</Text>
                <Text>{resume.linkedin}</Text>

                <Text style={styles.sectionTitle}>Skills</Text>
                {resume.skills.map((skill: string, i: number) => (
                    <Text key={i} style={styles.listItem}>
                        • {skill}
                    </Text>
                ))}
            </View>

            <View style={styles.main}>
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
            </View>
        </Page>
    </Document>
);

export default ResumeTemplateClassic;
