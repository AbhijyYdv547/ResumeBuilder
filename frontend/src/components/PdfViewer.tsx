import React from "react";
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";

// Define styles for the PDF
const styles = StyleSheet.create({
  page: { padding: 20, fontSize: 12 },
  section: { marginBottom: 10 },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  listItem: { marginLeft: 10 },
});

// Define the Resume PDF structure
const ResumeDocument = ({ resume }: { resume: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Name & Contact */}
      <View style={styles.section}>
        <Text style={styles.header}>{resume.name}</Text>
        <Text>{resume.phone} | {resume.email} | {resume.linkedin}</Text>
      </View>

      {/* Summary */}
      {resume.summary && (
        <View style={styles.section}>
          <Text style={styles.header}>Summary</Text>
          <Text>{resume.summary}</Text>
        </View>
      )}

      {/* Skills */}
      {resume.skills && (
        <View style={styles.section}>
          <Text style={styles.header}>Skills</Text>
          {resume.skills.map((skill: string, index: number) => (
            <Text key={index} style={styles.listItem}>• {skill}</Text>
          ))}
        </View>
      )}

      {/* Experience */}
      {resume.experience && (
        <View style={styles.section}>
          <Text style={styles.header}>Experience</Text>
          {resume.experience.map((exp: string, index: number) => (
            <Text key={index}>{exp}</Text>
          ))}
        </View>
      )}

      {/* Education */}
      {resume.education && (
        <View style={styles.section}>
          <Text style={styles.header}>Education</Text>
          <Text>{resume.education}</Text>
        </View>
      )}
    </Page>
  </Document>
);

// PDF Viewer Component with Download Button
const PdfViewer = ({ resume }: { resume: any }) => (
  <PDFDownloadLink document={<ResumeDocument resume={resume} />} fileName="resume.pdf">
    {({ loading }) => (
      <button
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition duration-200"
      >
        {loading ? "Generating..." : "Download PDF"}
      </button>
    )}
  </PDFDownloadLink>
);

export default PdfViewer;
