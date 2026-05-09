'use client'

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import type { Resume, TemplateId } from '@/types/resume'

/* ─────────────────────────────────────────────
   CLASSIC  — centered header, bold uppercase sections, dark footer
───────────────────────────────────────────── */
const classicStyles = StyleSheet.create({
  page: { fontFamily: 'Helvetica', fontSize: 10, color: '#1a1a1a', paddingBottom: 32 },
  // Header
  header: { alignItems: 'center', paddingHorizontal: 48, paddingTop: 36, paddingBottom: 12 },
  name: { fontSize: 26, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 4 },
  jobTitle: { fontSize: 12, color: '#444', marginBottom: 10 },
  contactRow: { flexDirection: 'row', justifyContent: 'center', gap: 20, fontSize: 9, color: '#555' },
  contactItem: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  divider: { borderBottomWidth: 1, borderBottomColor: '#ccc', marginHorizontal: 48, marginBottom: 14 },
  // Body
  body: { paddingHorizontal: 48 },
  section: { marginBottom: 14 },
  sectionTitle: { fontSize: 11, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 3 },
  sectionDivider: { borderBottomWidth: 1, borderBottomColor: '#1a1a1a', marginBottom: 8 },
  // Entry
  entryMeta: { fontSize: 9, color: '#666', marginBottom: 2 },
  entryTitle: { fontSize: 10, fontFamily: 'Helvetica-Bold', marginBottom: 3 },
  entryBody: { fontSize: 9.5, color: '#333', lineHeight: 1.5, marginBottom: 6 },
  bullet: { flexDirection: 'row', marginBottom: 2.5 },
  bulletDot: { marginRight: 5, color: '#444' },
  bulletText: { flex: 1, fontSize: 9.5, color: '#333', lineHeight: 1.4 },
  // Skills grid
  skillsGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  skillCol: { width: '33%' },
  skillItem: { flexDirection: 'row', marginBottom: 3, fontSize: 9.5 },
  // Footer bar
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#2d2d2d', height: 22 },
})

function ClassicDocument({ resume }: { resume: Resume }) {
  const { personalInfo: p, experience, education, skills } = resume
  return (
    <Document>
      <Page size="LETTER" style={classicStyles.page}>
        {/* Header */}
        <View style={classicStyles.header}>
          <Text style={classicStyles.name}>{p.name || 'Your Name'}</Text>
          {p.summary && <Text style={classicStyles.jobTitle}>{p.summary.split('.')[0]}</Text>}
          <View style={classicStyles.contactRow}>
            {p.phone && <Text style={classicStyles.contactItem}>☏ {p.phone}</Text>}
            {p.email && <Text style={classicStyles.contactItem}>✉ {p.email}</Text>}
            {p.location && <Text style={classicStyles.contactItem}>⊙ {p.location}</Text>}
            {p.linkedin && <Text style={classicStyles.contactItem}>in {p.linkedin}</Text>}
          </View>
        </View>
        <View style={classicStyles.divider} />

        <View style={classicStyles.body}>
          {/* About / Summary */}
          {p.summary && (
            <View style={classicStyles.section}>
              <Text style={classicStyles.sectionTitle}>About Me</Text>
              <View style={classicStyles.sectionDivider} />
              <Text style={{ fontSize: 9.5, color: '#333', lineHeight: 1.6 }}>{p.summary}</Text>
            </View>
          )}

          {/* Education */}
          {education.length > 0 && (
            <View style={classicStyles.section}>
              <Text style={classicStyles.sectionTitle}>Education</Text>
              <View style={classicStyles.sectionDivider} />
              {education.map((edu) => (
                <View key={edu.id} style={{ marginBottom: 8 }}>
                  <Text style={classicStyles.entryMeta}>{edu.school}{edu.graduationDate ? ` | ${edu.graduationDate}` : ''}</Text>
                  <Text style={classicStyles.entryTitle}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</Text>
                  {edu.gpa ? <Text style={classicStyles.entryBody}>GPA: {edu.gpa}</Text> : null}
                </View>
              ))}
            </View>
          )}

          {/* Work Experience */}
          {experience.length > 0 && (
            <View style={classicStyles.section}>
              <Text style={classicStyles.sectionTitle}>Work Experience</Text>
              <View style={classicStyles.sectionDivider} />
              {experience.map((exp) => (
                <View key={exp.id} style={{ marginBottom: 10 }}>
                  <Text style={classicStyles.entryMeta}>
                    {exp.company}{exp.startDate ? ` | ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}` : ''}
                  </Text>
                  <Text style={classicStyles.entryTitle}>{exp.title}</Text>
                  {exp.bullets.filter(Boolean).map((b, i) => (
                    <View key={i} style={classicStyles.bullet}>
                      <Text style={classicStyles.bulletDot}>•</Text>
                      <Text style={classicStyles.bulletText}>{b}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <View style={classicStyles.section}>
              <Text style={classicStyles.sectionTitle}>Skills</Text>
              <View style={classicStyles.sectionDivider} />
              <View style={classicStyles.skillsGrid}>
                {skills.map((sk) => (
                  <View key={sk.id} style={classicStyles.skillCol}>
                    <View style={classicStyles.skillItem}>
                      <Text style={{ marginRight: 4 }}>•</Text>
                      <Text>{sk.name}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* Dark footer bar */}
        <View style={classicStyles.footer} fixed />
      </Page>
    </Document>
  )
}

/* ─────────────────────────────────────────────
   MODERN  — blue header bar, sharp sections
───────────────────────────────────────────── */
const modernStyles = StyleSheet.create({
  page: { fontFamily: 'Helvetica', fontSize: 10, color: '#1a1a1a' },
  header: { backgroundColor: '#1d4ed8', paddingHorizontal: 40, paddingVertical: 24 },
  name: { fontSize: 22, fontFamily: 'Helvetica-Bold', color: '#fff', marginBottom: 3 },
  title: { fontSize: 11, color: '#bfdbfe', marginBottom: 8 },
  contactRow: { flexDirection: 'row', gap: 16, fontSize: 9, color: '#93c5fd' },
  body: { paddingHorizontal: 40, paddingTop: 18 },
  section: { marginBottom: 14 },
  sectionTitle: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: '#1d4ed8', textTransform: 'uppercase', letterSpacing: 1, borderBottomWidth: 1, borderBottomColor: '#bfdbfe', paddingBottom: 3, marginBottom: 8 },
  entryHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  entryTitle: { fontFamily: 'Helvetica-Bold', fontSize: 10 },
  entryCompany: { color: '#1d4ed8', fontSize: 9, marginBottom: 3 },
  entryDate: { color: '#64748b', fontSize: 9 },
  bullet: { flexDirection: 'row', marginBottom: 2.5, paddingLeft: 8 },
  bulletDot: { marginRight: 5, color: '#1d4ed8', fontFamily: 'Helvetica-Bold' },
  bulletText: { flex: 1, lineHeight: 1.4 },
  skillBadge: { backgroundColor: '#eff6ff', color: '#1d4ed8', fontSize: 9, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 3, marginRight: 5, marginBottom: 5 },
  skillsRow: { flexDirection: 'row', flexWrap: 'wrap' },
})

function ModernDocument({ resume }: { resume: Resume }) {
  const { personalInfo: p, experience, education, skills } = resume
  return (
    <Document>
      <Page size="LETTER" style={modernStyles.page}>
        <View style={modernStyles.header}>
          <Text style={modernStyles.name}>{p.name || 'Your Name'}</Text>
          {p.summary && <Text style={modernStyles.title}>{p.summary.split('.')[0]}</Text>}
          <View style={modernStyles.contactRow}>
            {p.email && <Text>{p.email}</Text>}
            {p.phone && <Text>{p.phone}</Text>}
            {p.location && <Text>{p.location}</Text>}
          </View>
        </View>
        <View style={modernStyles.body}>
          {p.summary && (
            <View style={modernStyles.section}>
              <Text style={modernStyles.sectionTitle}>Summary</Text>
              <Text style={{ fontSize: 9.5, lineHeight: 1.5, color: '#374151' }}>{p.summary}</Text>
            </View>
          )}
          {experience.length > 0 && (
            <View style={modernStyles.section}>
              <Text style={modernStyles.sectionTitle}>Experience</Text>
              {experience.map(exp => (
                <View key={exp.id} style={{ marginBottom: 10 }}>
                  <View style={modernStyles.entryHeader}>
                    <Text style={modernStyles.entryTitle}>{exp.title}</Text>
                    <Text style={modernStyles.entryDate}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</Text>
                  </View>
                  <Text style={modernStyles.entryCompany}>{exp.company}</Text>
                  {exp.bullets.filter(Boolean).map((b, i) => (
                    <View key={i} style={modernStyles.bullet}>
                      <Text style={modernStyles.bulletDot}>›</Text>
                      <Text style={modernStyles.bulletText}>{b}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}
          {education.length > 0 && (
            <View style={modernStyles.section}>
              <Text style={modernStyles.sectionTitle}>Education</Text>
              {education.map(edu => (
                <View key={edu.id} style={{ marginBottom: 6 }}>
                  <View style={modernStyles.entryHeader}>
                    <Text style={modernStyles.entryTitle}>{edu.school}</Text>
                    <Text style={modernStyles.entryDate}>{edu.graduationDate}</Text>
                  </View>
                  <Text style={{ fontSize: 9, color: '#475569' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</Text>
                </View>
              ))}
            </View>
          )}
          {skills.length > 0 && (
            <View style={modernStyles.section}>
              <Text style={modernStyles.sectionTitle}>Skills</Text>
              <View style={modernStyles.skillsRow}>
                {skills.map(sk => <Text key={sk.id} style={modernStyles.skillBadge}>{sk.name}</Text>)}
              </View>
            </View>
          )}
        </View>
      </Page>
    </Document>
  )
}

/* ─────────────────────────────────────────────
   MINIMAL  — ultra clean, lots of whitespace
───────────────────────────────────────────── */
const minimalStyles = StyleSheet.create({
  page: { fontFamily: 'Helvetica', fontSize: 10, color: '#111827', padding: 52 },
  name: { fontSize: 24, fontFamily: 'Helvetica-Bold', fontWeight: 300, marginBottom: 3 },
  title: { fontSize: 11, color: '#6b7280', marginBottom: 6 },
  contactRow: { flexDirection: 'row', gap: 14, fontSize: 9, color: '#9ca3af', marginBottom: 24 },
  section: { marginBottom: 18 },
  sectionTitle: { fontSize: 8, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', letterSpacing: 2, color: '#9ca3af', marginBottom: 8 },
  entryHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 1 },
  entryTitle: { fontFamily: 'Helvetica-Bold', fontSize: 10, color: '#111827' },
  entryCompany: { color: '#6b7280', fontSize: 9, marginBottom: 3 },
  entryDate: { color: '#9ca3af', fontSize: 9 },
  bullet: { flexDirection: 'row', marginBottom: 2.5 },
  bulletDot: { marginRight: 6, color: '#9ca3af' },
  bulletText: { flex: 1, lineHeight: 1.5, color: '#374151' },
  skillsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
  skillItem: { fontSize: 9, color: '#6b7280' },
})

function MinimalDocument({ resume }: { resume: Resume }) {
  const { personalInfo: p, experience, education, skills } = resume
  return (
    <Document>
      <Page size="LETTER" style={minimalStyles.page}>
        <Text style={minimalStyles.name}>{p.name || 'Your Name'}</Text>
        {p.summary && <Text style={minimalStyles.title}>{p.summary.split('.')[0]}</Text>}
        <View style={minimalStyles.contactRow}>
          {p.email && <Text>{p.email}</Text>}
          {p.phone && <Text>{p.phone}</Text>}
          {p.location && <Text>{p.location}</Text>}
        </View>
        {p.summary && (
          <View style={minimalStyles.section}>
            <Text style={minimalStyles.sectionTitle}>Profile</Text>
            <Text style={{ fontSize: 9.5, lineHeight: 1.6, color: '#374151' }}>{p.summary}</Text>
          </View>
        )}
        {experience.length > 0 && (
          <View style={minimalStyles.section}>
            <Text style={minimalStyles.sectionTitle}>Experience</Text>
            {experience.map(exp => (
              <View key={exp.id} style={{ marginBottom: 10 }}>
                <View style={minimalStyles.entryHeader}>
                  <Text style={minimalStyles.entryTitle}>{exp.title}</Text>
                  <Text style={minimalStyles.entryDate}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</Text>
                </View>
                <Text style={minimalStyles.entryCompany}>{exp.company}</Text>
                {exp.bullets.filter(Boolean).map((b, i) => (
                  <View key={i} style={minimalStyles.bullet}>
                    <Text style={minimalStyles.bulletDot}>–</Text>
                    <Text style={minimalStyles.bulletText}>{b}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}
        {education.length > 0 && (
          <View style={minimalStyles.section}>
            <Text style={minimalStyles.sectionTitle}>Education</Text>
            {education.map(edu => (
              <View key={edu.id} style={{ marginBottom: 6 }}>
                <View style={minimalStyles.entryHeader}>
                  <Text style={minimalStyles.entryTitle}>{edu.school}</Text>
                  <Text style={minimalStyles.entryDate}>{edu.graduationDate}</Text>
                </View>
                <Text style={minimalStyles.entryCompany}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</Text>
              </View>
            ))}
          </View>
        )}
        {skills.length > 0 && (
          <View style={minimalStyles.section}>
            <Text style={minimalStyles.sectionTitle}>Skills</Text>
            <Text style={{ fontSize: 9.5, color: '#6b7280', lineHeight: 1.8 }}>{skills.map(s => s.name).join('  ·  ')}</Text>
          </View>
        )}
      </Page>
    </Document>
  )
}

/* ─────────────────────────────────────────────
   BOLD  — purple header, strong typography
───────────────────────────────────────────── */
const boldStyles = StyleSheet.create({
  page: { fontFamily: 'Helvetica', fontSize: 10, color: '#1a1a1a' },
  header: { backgroundColor: '#7c3aed', paddingHorizontal: 40, paddingVertical: 26 },
  name: { fontSize: 24, fontFamily: 'Helvetica-Bold', color: '#fff', marginBottom: 3 },
  title: { fontSize: 11, color: '#ddd6fe', marginBottom: 8 },
  contactRow: { flexDirection: 'row', gap: 14, fontSize: 9, color: '#c4b5fd' },
  body: { paddingHorizontal: 40, paddingTop: 18 },
  sectionRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 8 },
  dot: { width: 5, height: 5, backgroundColor: '#7c3aed', borderRadius: 3 },
  sectionTitle: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: '#7c3aed', textTransform: 'uppercase', letterSpacing: 1 },
  section: { marginBottom: 14 },
  entryHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 1 },
  entryTitle: { fontFamily: 'Helvetica-Bold', fontSize: 10 },
  entryCompany: { color: '#7c3aed', fontSize: 9, marginBottom: 3 },
  entryDate: { color: '#64748b', fontSize: 9 },
  bullet: { flexDirection: 'row', marginBottom: 2.5, paddingLeft: 8 },
  bulletDot: { marginRight: 5, color: '#7c3aed', fontFamily: 'Helvetica-Bold', fontSize: 11 },
  bulletText: { flex: 1, lineHeight: 1.4 },
  skillBadge: { backgroundColor: '#f5f3ff', color: '#7c3aed', fontSize: 9, paddingHorizontal: 7, paddingVertical: 2, borderRadius: 3, marginRight: 4, marginBottom: 4 },
  skillsRow: { flexDirection: 'row', flexWrap: 'wrap' },
})

function BoldDocument({ resume }: { resume: Resume }) {
  const { personalInfo: p, experience, education, skills } = resume
  return (
    <Document>
      <Page size="LETTER" style={boldStyles.page}>
        <View style={boldStyles.header}>
          <Text style={boldStyles.name}>{p.name || 'Your Name'}</Text>
          {p.summary && <Text style={boldStyles.title}>{p.summary.split('.')[0]}</Text>}
          <View style={boldStyles.contactRow}>
            {p.email && <Text>{p.email}</Text>}
            {p.phone && <Text>{p.phone}</Text>}
            {p.location && <Text>{p.location}</Text>}
          </View>
        </View>
        <View style={boldStyles.body}>
          {p.summary && (
            <View style={boldStyles.section}>
              <View style={boldStyles.sectionRow}><View style={boldStyles.dot} /><Text style={boldStyles.sectionTitle}>Summary</Text></View>
              <Text style={{ fontSize: 9.5, lineHeight: 1.5, color: '#374151' }}>{p.summary}</Text>
            </View>
          )}
          {experience.length > 0 && (
            <View style={boldStyles.section}>
              <View style={boldStyles.sectionRow}><View style={boldStyles.dot} /><Text style={boldStyles.sectionTitle}>Experience</Text></View>
              {experience.map(exp => (
                <View key={exp.id} style={{ marginBottom: 10 }}>
                  <View style={boldStyles.entryHeader}>
                    <Text style={boldStyles.entryTitle}>{exp.title}</Text>
                    <Text style={boldStyles.entryDate}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</Text>
                  </View>
                  <Text style={boldStyles.entryCompany}>{exp.company}</Text>
                  {exp.bullets.filter(Boolean).map((b, i) => (
                    <View key={i} style={boldStyles.bullet}>
                      <Text style={boldStyles.bulletDot}>▸</Text>
                      <Text style={boldStyles.bulletText}>{b}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}
          {education.length > 0 && (
            <View style={boldStyles.section}>
              <View style={boldStyles.sectionRow}><View style={boldStyles.dot} /><Text style={boldStyles.sectionTitle}>Education</Text></View>
              {education.map(edu => (
                <View key={edu.id} style={{ marginBottom: 6 }}>
                  <View style={boldStyles.entryHeader}>
                    <Text style={boldStyles.entryTitle}>{edu.school}</Text>
                    <Text style={boldStyles.entryDate}>{edu.graduationDate}</Text>
                  </View>
                  <Text style={{ fontSize: 9, color: '#475569' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</Text>
                </View>
              ))}
            </View>
          )}
          {skills.length > 0 && (
            <View style={boldStyles.section}>
              <View style={boldStyles.sectionRow}><View style={boldStyles.dot} /><Text style={boldStyles.sectionTitle}>Skills</Text></View>
              <View style={boldStyles.skillsRow}>
                {skills.map(sk => <Text key={sk.id} style={boldStyles.skillBadge}>{sk.name}</Text>)}
              </View>
            </View>
          )}
        </View>
      </Page>
    </Document>
  )
}

/* ─────────────────────────────────────────────
   SIDEBAR  — teal sidebar, two-column layout
───────────────────────────────────────────── */
const sidebarStyles = StyleSheet.create({
  page: { fontFamily: 'Helvetica', fontSize: 10, color: '#1a1a1a', flexDirection: 'row' },
  sidebar: { width: 170, backgroundColor: '#0f766e', padding: 24, flexDirection: 'column' },
  avatarCircle: { width: 52, height: 52, borderRadius: 26, backgroundColor: '#2dd4bf', alignSelf: 'center', marginBottom: 10, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontSize: 16, fontFamily: 'Helvetica-Bold' },
  sidebarName: { fontSize: 12, fontFamily: 'Helvetica-Bold', color: '#fff', textAlign: 'center', marginBottom: 3 },
  sidebarTitle: { fontSize: 8.5, color: '#99f6e4', textAlign: 'center', marginBottom: 14 },
  sidebarSection: { marginBottom: 12 },
  sidebarSectionTitle: { fontSize: 8, fontFamily: 'Helvetica-Bold', color: '#2dd4bf', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 6, borderBottomWidth: 0.5, borderBottomColor: '#2dd4bf', paddingBottom: 3 },
  sidebarItem: { fontSize: 8.5, color: '#ccfbf1', marginBottom: 3, lineHeight: 1.4 },
  main: { flex: 1, padding: 28 },
  section: { marginBottom: 14 },
  sectionTitle: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#0f766e', textTransform: 'uppercase', letterSpacing: 1, borderBottomWidth: 1, borderBottomColor: '#99f6e4', paddingBottom: 3, marginBottom: 8 },
  entryHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 1 },
  entryTitle: { fontFamily: 'Helvetica-Bold', fontSize: 10 },
  entryCompany: { color: '#0f766e', fontSize: 9, marginBottom: 2 },
  entryDate: { color: '#64748b', fontSize: 9 },
  bullet: { flexDirection: 'row', marginBottom: 2.5 },
  bulletDot: { marginRight: 5, color: '#0f766e' },
  bulletText: { flex: 1, lineHeight: 1.4 },
})

function SidebarDocument({ resume }: { resume: Resume }) {
  const { personalInfo: p, experience, education, skills } = resume
  const initials = p.name ? p.name.split(' ').map(n => n[0]).slice(0, 2).join('') : 'YN'
  return (
    <Document>
      <Page size="LETTER" style={sidebarStyles.page}>
        {/* Sidebar */}
        <View style={sidebarStyles.sidebar}>
          <View style={sidebarStyles.avatarCircle}><Text style={sidebarStyles.avatarText}>{initials}</Text></View>
          <Text style={sidebarStyles.sidebarName}>{p.name || 'Your Name'}</Text>
          {p.summary && <Text style={sidebarStyles.sidebarTitle}>{p.summary.split('.')[0]}</Text>}
          <View style={sidebarStyles.sidebarSection}>
            <Text style={sidebarStyles.sidebarSectionTitle}>Contact</Text>
            {p.email && <Text style={sidebarStyles.sidebarItem}>{p.email}</Text>}
            {p.phone && <Text style={sidebarStyles.sidebarItem}>{p.phone}</Text>}
            {p.location && <Text style={sidebarStyles.sidebarItem}>{p.location}</Text>}
          </View>
          {skills.length > 0 && (
            <View style={sidebarStyles.sidebarSection}>
              <Text style={sidebarStyles.sidebarSectionTitle}>Skills</Text>
              {skills.map(sk => <Text key={sk.id} style={sidebarStyles.sidebarItem}>· {sk.name}</Text>)}
            </View>
          )}
          {education.length > 0 && (
            <View style={sidebarStyles.sidebarSection}>
              <Text style={sidebarStyles.sidebarSectionTitle}>Education</Text>
              {education.map(edu => (
                <View key={edu.id} style={{ marginBottom: 6 }}>
                  <Text style={{ ...sidebarStyles.sidebarItem, fontFamily: 'Helvetica-Bold', color: '#fff' }}>{edu.school}</Text>
                  <Text style={sidebarStyles.sidebarItem}>{edu.degree}</Text>
                  <Text style={sidebarStyles.sidebarItem}>{edu.graduationDate}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
        {/* Main content */}
        <View style={sidebarStyles.main}>
          {p.summary && (
            <View style={sidebarStyles.section}>
              <Text style={sidebarStyles.sectionTitle}>Profile</Text>
              <Text style={{ fontSize: 9.5, lineHeight: 1.6, color: '#374151' }}>{p.summary}</Text>
            </View>
          )}
          {experience.length > 0 && (
            <View style={sidebarStyles.section}>
              <Text style={sidebarStyles.sectionTitle}>Experience</Text>
              {experience.map(exp => (
                <View key={exp.id} style={{ marginBottom: 10 }}>
                  <View style={sidebarStyles.entryHeader}>
                    <Text style={sidebarStyles.entryTitle}>{exp.title}</Text>
                    <Text style={sidebarStyles.entryDate}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</Text>
                  </View>
                  <Text style={sidebarStyles.entryCompany}>{exp.company}</Text>
                  {exp.bullets.filter(Boolean).map((b, i) => (
                    <View key={i} style={sidebarStyles.bullet}>
                      <Text style={sidebarStyles.bulletDot}>•</Text>
                      <Text style={sidebarStyles.bulletText}>{b}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  )
}

/* ─────────────────────────────────────────────
   CLEAN  — centered amber header, elegant
───────────────────────────────────────────── */
const cleanStyles = StyleSheet.create({
  page: { fontFamily: 'Helvetica', fontSize: 10, color: '#1c1917', padding: 44 },
  header: { alignItems: 'center', borderBottomWidth: 2, borderBottomColor: '#b45309', paddingBottom: 12, marginBottom: 14 },
  name: { fontSize: 22, fontFamily: 'Helvetica-Bold', color: '#1c1917', marginBottom: 3 },
  title: { fontSize: 11, color: '#b45309', marginBottom: 6 },
  contactRow: { flexDirection: 'row', gap: 14, fontSize: 9, color: '#78716c' },
  section: { marginBottom: 14 },
  sectionTitle: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#b45309', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 7 },
  entryHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  entryTitle: { fontFamily: 'Helvetica-Bold', fontSize: 10, color: '#1c1917' },
  entryCompany: { color: '#57534e', fontSize: 9, marginBottom: 3 },
  entryDate: { color: '#78716c', fontSize: 9 },
  bullet: { flexDirection: 'row', marginBottom: 2.5 },
  bulletDot: { marginRight: 5, color: '#b45309' },
  bulletText: { flex: 1, lineHeight: 1.4, color: '#44403c' },
  skillBadge: { borderWidth: 0.5, borderColor: '#d6d3d1', color: '#57534e', fontSize: 9, paddingHorizontal: 7, paddingVertical: 2, borderRadius: 3, marginRight: 5, marginBottom: 5 },
  skillsRow: { flexDirection: 'row', flexWrap: 'wrap' },
})

function CleanDocument({ resume }: { resume: Resume }) {
  const { personalInfo: p, experience, education, skills } = resume
  return (
    <Document>
      <Page size="LETTER" style={cleanStyles.page}>
        <View style={cleanStyles.header}>
          <Text style={cleanStyles.name}>{p.name || 'Your Name'}</Text>
          {p.summary && <Text style={cleanStyles.title}>{p.summary.split('.')[0]}</Text>}
          <View style={cleanStyles.contactRow}>
            {p.email && <Text>{p.email}</Text>}
            {p.phone && <Text>{p.phone}</Text>}
            {p.location && <Text>{p.location}</Text>}
          </View>
        </View>
        {p.summary && (
          <View style={cleanStyles.section}>
            <Text style={cleanStyles.sectionTitle}>Profile</Text>
            <Text style={{ fontSize: 9.5, lineHeight: 1.6, color: '#57534e' }}>{p.summary}</Text>
          </View>
        )}
        {experience.length > 0 && (
          <View style={cleanStyles.section}>
            <Text style={cleanStyles.sectionTitle}>Experience</Text>
            {experience.map(exp => (
              <View key={exp.id} style={{ marginBottom: 10 }}>
                <View style={cleanStyles.entryHeader}>
                  <Text style={cleanStyles.entryTitle}>{exp.title} · {exp.company}</Text>
                  <Text style={cleanStyles.entryDate}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</Text>
                </View>
                {exp.bullets.filter(Boolean).map((b, i) => (
                  <View key={i} style={cleanStyles.bullet}>
                    <Text style={cleanStyles.bulletDot}>▪</Text>
                    <Text style={cleanStyles.bulletText}>{b}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}
        {education.length > 0 && (
          <View style={cleanStyles.section}>
            <Text style={cleanStyles.sectionTitle}>Education</Text>
            {education.map(edu => (
              <View key={edu.id} style={{ marginBottom: 6 }}>
                <View style={cleanStyles.entryHeader}>
                  <Text style={cleanStyles.entryTitle}>{edu.school}</Text>
                  <Text style={cleanStyles.entryDate}>{edu.graduationDate}</Text>
                </View>
                <Text style={cleanStyles.entryCompany}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</Text>
              </View>
            ))}
          </View>
        )}
        {skills.length > 0 && (
          <View style={cleanStyles.section}>
            <Text style={cleanStyles.sectionTitle}>Skills</Text>
            <View style={cleanStyles.skillsRow}>
              {skills.map(sk => <Text key={sk.id} style={cleanStyles.skillBadge}>{sk.name}</Text>)}
            </View>
          </View>
        )}
      </Page>
    </Document>
  )
}

/* ─────────────────────────────────────────────
   Router
───────────────────────────────────────────── */
const DOCS: Record<TemplateId, React.FC<{ resume: Resume }>> = {
  classic: ClassicDocument,
  modern: ModernDocument,
  minimal: MinimalDocument,
  bold: BoldDocument,
  sidebar: SidebarDocument,
  clean: CleanDocument,
}

export default function ResumeDocument({ resume, templateId = 'classic' }: { resume: Resume; templateId?: TemplateId }) {
  const Doc = DOCS[templateId] ?? ClassicDocument
  return <Doc resume={resume} />
}
