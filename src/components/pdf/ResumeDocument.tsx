'use client'

import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer'
import type { Resume } from '@/types/resume'

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica', fontSize: 10, color: '#1a1a1a' },
  name: { fontSize: 22, fontFamily: 'Helvetica-Bold', marginBottom: 4 },
  contact: { fontSize: 9, color: '#555', marginBottom: 16, flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  contactItem: { marginRight: 12 },
  section: { marginBottom: 14 },
  sectionTitle: { fontSize: 11, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', letterSpacing: 1, borderBottomWidth: 1, borderBottomColor: '#ddd', paddingBottom: 3, marginBottom: 8 },
  entryHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  entryTitle: { fontFamily: 'Helvetica-Bold', fontSize: 10 },
  entrySubtitle: { color: '#444', fontSize: 9 },
  entryDate: { color: '#666', fontSize: 9 },
  bullet: { flexDirection: 'row', marginBottom: 3, paddingLeft: 10 },
  bulletDot: { marginRight: 6, color: '#444' },
  bulletText: { flex: 1, lineHeight: 1.4 },
  summary: { lineHeight: 1.5, color: '#333', marginBottom: 14 },
  skillsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  skillBadge: { backgroundColor: '#f0f0f0', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4, fontSize: 9 },
})

export default function ResumeDocument({ resume }: { resume: Resume }) {
  const { personalInfo, experience, education, skills } = resume

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <Text style={styles.name}>{personalInfo.name || 'Your Name'}</Text>
        <View style={styles.contact}>
          {personalInfo.email && <Text style={styles.contactItem}>{personalInfo.email}</Text>}
          {personalInfo.phone && <Text style={styles.contactItem}>{personalInfo.phone}</Text>}
          {personalInfo.location && <Text style={styles.contactItem}>{personalInfo.location}</Text>}
          {personalInfo.linkedin && <Text style={styles.contactItem}>{personalInfo.linkedin}</Text>}
          {personalInfo.website && <Text style={styles.contactItem}>{personalInfo.website}</Text>}
        </View>

        {/* Summary */}
        {personalInfo.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.summary}>{personalInfo.summary}</Text>
          </View>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {experience.map((exp) => (
              <View key={exp.id} style={{ marginBottom: 10 }}>
                <View style={styles.entryHeader}>
                  <View>
                    <Text style={styles.entryTitle}>{exp.title}</Text>
                    <Text style={styles.entrySubtitle}>{exp.company}</Text>
                  </View>
                  <Text style={styles.entryDate}>
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </Text>
                </View>
                {exp.bullets.filter(Boolean).map((b, i) => (
                  <View key={i} style={styles.bullet}>
                    <Text style={styles.bulletDot}>•</Text>
                    <Text style={styles.bulletText}>{b}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu) => (
              <View key={edu.id} style={{ marginBottom: 8 }}>
                <View style={styles.entryHeader}>
                  <View>
                    <Text style={styles.entryTitle}>{edu.school}</Text>
                    <Text style={styles.entrySubtitle}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</Text>
                  </View>
                  <Text style={styles.entryDate}>{edu.graduationDate}</Text>
                </View>
                {edu.gpa && <Text style={styles.entrySubtitle}>GPA: {edu.gpa}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsRow}>
              {skills.map((s) => (
                <Text key={s.id} style={styles.skillBadge}>{s.name}</Text>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  )
}
