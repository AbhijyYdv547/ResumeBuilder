import React from "react";
import { Page, Text, View, Document, StyleSheet, BlobProvider } from "@react-pdf/renderer";
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    fontSize: 12,
    fontFamily: "Helvetica",
    color: "#1f2937",
  },
  sidebar: {
    width: "33%",
    backgroundColor: "#1a202c",
    color: "#fff",
    padding: 20,
  },
  mainContent: {
    width: "67%",
    padding: 20,
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
  },
  contactInfo: {
    fontSize: 11,
    marginBottom: 6,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: "bold",
    marginVertical: 8,
    color: "#111827",
  },
  sectionText: {
    marginBottom: 5,
    fontSize: 11,
    lineHeight: 1.4,
  },
  listItem: {
    marginLeft: 10,
    fontSize: 11,
    marginBottom: 2,
  },
  expItem: {
    marginBottom: 10,
    borderBottomWidth: 0.5,
    borderColor: "#e5e7eb",
    paddingBottom: 6,
  },
  projectItem: {
    marginBottom: 10,
    paddingBottom: 6,
  },
});

const parseExperienceString = (expStr: string) => {
  const jobTitleMatch = expStr.match(/\*\*(.+?)\*\*/);
  const companyMatch = expStr.match(/at (.+?),/);
  const locationMatch = expStr.match(/, ([^()]+) \(/);
  const dateMatch = expStr.match(/\(([^)]+)\)/);

  return {
    jobTitle: jobTitleMatch?.[1] || "Job Title",
    company: companyMatch?.[1] || "Company",
    location: locationMatch?.[1] || "Location",
    startDate: dateMatch?.[1]?.split(" - ")[0] || "",
    endDate: dateMatch?.[1]?.split(" - ")[1] || "",
    responsibilities: [],
  };
};

const parseProjectString = (projStr: string) => {
  const nameMatch = projStr.match(/\*\*(.+?)\*\*/);
  const descriptionMatch = projStr.match(/\*\*.+?\*\* - (.+?) \(Tech:/);
  const techMatch = projStr.match(/Tech: (.+?)\)/);

  return {
    name: nameMatch?.[1] || "Project",
    description: descriptionMatch?.[1] || "Description",
    technologies: techMatch?.[1]?.split(",").map(t => t.trim()) || [],
  };
};


const ResumeDocument = ({ resume }: { resume: any }) => {
  // Normalize experience
  const normalizedExperience = resume.experience.map((exp: any) =>
    typeof exp === "string" ? parseExperienceString(exp) : exp
  );

  // Normalize projects
  const normalizedProjects = resume.projects.map((proj: any) =>
    typeof proj === "string" ? parseProjectString(proj) : proj
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          <Text style={styles.name}>{resume.name}</Text>
          <Text style={styles.contactInfo}>{resume.phone}</Text>
          <Text style={styles.contactInfo}>{resume.email}</Text>
          <Text style={styles.contactInfo}>{resume.linkedin}</Text>

          {/* Skills */}
          {resume.skills?.length > 0 && (
            <>
              <Text style={{ ...styles.sectionHeader, color: "#e5e7eb" }}>
                Skills
              </Text>
              {resume.skills.map((skill: string, index: number) => (
                <Text key={index} style={styles.listItem}>
                  • {skill}
                </Text>
              ))}
            </>
          )}
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Summary */}
          {resume.summary && (
            <>
              <Text style={styles.sectionHeader}>Summary</Text>
              <Text style={styles.sectionText}>{resume.summary}</Text>
            </>
          )}

          {/* Experience */}
          {normalizedExperience.length > 0 && (
            <>
              <Text style={styles.sectionHeader}>Work Experience</Text>
              {normalizedExperience.map((exp: any, i: number) => (
                <View key={i} style={styles.expItem}>
                  <Text style={{ fontWeight: "bold" }}>{exp.jobTitle}</Text>
                  <Text>
                    at{" "}
                    <Text style={{ fontWeight: "semibold" }}>
                      {exp.company}
                    </Text>
                    , {exp.location}
                  </Text>
                  <Text style={{ fontSize: 10, color: "#6b7280" }}>
                    {exp.startDate} - {exp.endDate}
                  </Text>
                  {exp.responsibilities?.length > 0 && (
                    <View style={{ marginTop: 4 }}>
                      {exp.responsibilities.map((resp: string, j: number) => (
                        <Text key={j} style={styles.listItem}>
                          • {resp}
                        </Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </>
          )}

          {/* Education */}
          {resume.education && (
            <>
              <Text style={styles.sectionHeader}>Education</Text>
              <Text style={styles.sectionText}>{resume.education}</Text>
            </>
          )}

          {/* Projects */}
          {normalizedProjects.length > 0 && (
            <>
              <Text style={styles.sectionHeader}>Projects</Text>
              {normalizedProjects.map((project: any, i: number) => (
                <View key={i} style={styles.projectItem}>
                  <Text style={{ fontWeight: "bold" }}>{project.name}</Text>
                  <Text style={styles.sectionText}>{project.description}</Text>
                  {project.technologies?.length > 0 && (
                    <Text style={{ fontSize: 11, color: "#374151" }}>
                      <Text style={{ fontWeight: "bold" }}>
                        Technologies:
                      </Text>{" "}
                      {project.technologies.join(", ")}
                    </Text>
                  )}
                </View>
              ))}
            </>
          )}
        </View>
      </Page>
    </Document>
  );
};


const PdfViewer = ({ resume }: { resume: any }) => (
  <BlobProvider document={<ResumeDocument resume={resume} />}>
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

export default PdfViewer;
