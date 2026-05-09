'use client'

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import type { Resume, TemplateId, TemplateConfig } from '@/types/resume'

const DEFAULT_CONFIG: TemplateConfig = { accentColor: '#2a7d7b', font: 'sans', spacing: 'normal' }

function fontFor(cfg: TemplateConfig, bold = false) {
  if (cfg.font === 'serif') return bold ? 'Times-Bold' : 'Times-Roman'
  return bold ? 'Helvetica-Bold' : 'Helvetica'
}

function pad(cfg: TemplateConfig, base: number) {
  const m = cfg.spacing === 'compact' ? 0.75 : cfg.spacing === 'spacious' ? 1.35 : 1
  return base * m
}

/* ─────────────────────────────────────────────
   CLASSIC — Sebastian Bennett style
   Centered uppercase name · bold section headers · dark footer
───────────────────────────────────────────── */
const cls = StyleSheet.create({
  page: { fontFamily: 'Helvetica', fontSize: 10, color: '#1a1a1a', paddingBottom: 28 },
  header: { alignItems: 'center', paddingHorizontal: 48, paddingTop: 36, paddingBottom: 10 },
  name: { fontSize: 26, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', letterSpacing: 2.5, marginBottom: 5 },
  jobTitle: { fontSize: 12, color: '#444', marginBottom: 10 },
  contactRow: { flexDirection: 'row', justifyContent: 'center', gap: 18, fontSize: 9, color: '#555' },
  headerDivider: { borderBottomWidth: 1, borderBottomColor: '#bbb', marginHorizontal: 48, marginBottom: 14 },
  body: { paddingHorizontal: 48 },
  section: { marginBottom: 13 },
  sectionHead: { fontSize: 11, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 3 },
  sectionLine: { borderBottomWidth: 1.5, borderBottomColor: '#1a1a1a', marginBottom: 8 },
  entryMeta: { fontSize: 9, color: '#666', marginBottom: 1.5 },
  entryTitle: { fontSize: 10, fontFamily: 'Helvetica-Bold', marginBottom: 3 },
  para: { fontSize: 9.5, color: '#333', lineHeight: 1.55 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 1.5 },
  bullet: { flexDirection: 'row', marginBottom: 2.5 },
  dot: { marginRight: 5 },
  bulletText: { flex: 1, fontSize: 9.5, color: '#333', lineHeight: 1.4 },
  skillsGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  skillCol: { width: '33%', flexDirection: 'row', marginBottom: 3 },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#2d2d2d', height: 20 },
})

function ClassicDoc({ resume: r, cfg }: { resume: Resume; cfg: TemplateConfig }) {
  const p = r.personalInfo
  const accent = cfg.accentColor
  const f = (bold = false) => fontFor(cfg, bold)
  const sp = (n: number) => pad(cfg, n)
  return (
    <Document>
      <Page size="LETTER" style={{ ...cls.page, fontFamily: f() }}>
        <View style={cls.header}>
          <Text style={cls.name}>{p.name || 'Your Name'}</Text>
          {p.summary && <Text style={cls.jobTitle}>{p.summary.split('.')[0]}</Text>}
          <View style={cls.contactRow}>
            {p.phone    && <Text>☏ {p.phone}</Text>}
            {p.email    && <Text>✉ {p.email}</Text>}
            {p.location && <Text>⊙ {p.location}</Text>}
            {p.linkedin && <Text>in {p.linkedin}</Text>}
          </View>
        </View>
        <View style={cls.headerDivider} />
        <View style={{ ...cls.body }}>
          {p.summary && (
            <View style={{ ...cls.section, marginBottom: sp(13) }}>
              <Text style={{ ...cls.sectionHead, fontFamily: f(true) }}>About Me</Text>
              <View style={{ ...cls.sectionLine, borderBottomColor: accent }} />
              <Text style={cls.para}>{p.summary}</Text>
            </View>
          )}
          {r.education.length > 0 && (
            <View style={{ ...cls.section, marginBottom: sp(13) }}>
              <Text style={{ ...cls.sectionHead, fontFamily: f(true) }}>Education</Text>
              <View style={{ ...cls.sectionLine, borderBottomColor: accent }} />
              {r.education.map(e => (
                <View key={e.id} style={{ marginBottom: sp(7) }}>
                  <Text style={cls.entryMeta}>{e.school}{e.graduationDate ? ` | ${e.graduationDate}` : ''}</Text>
                  <Text style={{ ...cls.entryTitle, fontFamily: f(true) }}>{e.degree}{e.field ? ` in ${e.field}` : ''}</Text>
                </View>
              ))}
            </View>
          )}
          {r.experience.length > 0 && (
            <View style={{ ...cls.section, marginBottom: sp(13) }}>
              <Text style={{ ...cls.sectionHead, fontFamily: f(true) }}>Work Experience</Text>
              <View style={{ ...cls.sectionLine, borderBottomColor: accent }} />
              {r.experience.map(e => (
                <View key={e.id} style={{ marginBottom: 9 }}>
                  <Text style={cls.entryMeta}>{e.company}{e.startDate ? ` | ${e.startDate} – ${e.current ? 'Present' : e.endDate}` : ''}</Text>
                  <Text style={cls.entryTitle}>{e.title}</Text>
                  {e.bullets.filter(Boolean).map((b, i) => (
                    <View key={i} style={cls.bullet}>
                      <Text style={cls.dot}>•</Text>
                      <Text style={cls.bulletText}>{b}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}
          {r.skills.length > 0 && (
            <View style={{ ...cls.section, marginBottom: sp(13) }}>
              <Text style={{ ...cls.sectionHead, fontFamily: f(true) }}>Skills</Text>
              <View style={{ ...cls.sectionLine, borderBottomColor: accent }} />
              <View style={cls.skillsGrid}>
                {r.skills.map(s => (
                  <View key={s.id} style={cls.skillCol}>
                    <Text style={{ marginRight: 4, color: accent }}>•</Text>
                    <Text style={{ fontSize: 9.5 }}>{s.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
        <View style={{ ...cls.footer, backgroundColor: accent }} fixed />
      </Page>
    </Document>
  )
}

/* ─────────────────────────────────────────────
   MODERN — Renata Voss style
   Teal full-width header · left sidebar · main content
───────────────────────────────────────────── */
const mod = StyleSheet.create({
  page: { fontFamily: 'Helvetica', fontSize: 10, color: '#1a1a1a', flexDirection: 'column' },
  topBar: { backgroundColor: '#2a7d7b', paddingVertical: 22, paddingHorizontal: 40, alignItems: 'center' },
  topName: { fontSize: 28, fontFamily: 'Helvetica-Bold', color: '#fff', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 5 },
  topTitle: { fontSize: 11, color: '#d0f0ef', letterSpacing: 1.5, fontStyle: 'italic' },
  body: { flexDirection: 'row', flex: 1 },
  sidebar: { width: 160, backgroundColor: '#f7f7f7', borderRightWidth: 1, borderRightColor: '#e5e5e5', padding: 20 },
  sideSection: { marginBottom: 16 },
  sideHead: { fontSize: 10, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 4, textAlign: 'center' },
  sideLine: { borderBottomWidth: 1.5, borderBottomColor: '#2a7d7b', marginBottom: 8, width: 30, alignSelf: 'center' },
  sideText: { fontSize: 9, color: '#444', textAlign: 'center', lineHeight: 1.5, marginBottom: 2 },
  sideLink: { fontSize: 9, color: '#2a7d7b', textAlign: 'center', marginBottom: 2 },
  sideBullet: { fontSize: 9, color: '#444', textAlign: 'center', marginBottom: 2 },
  main: { flex: 1, padding: 24 },
  mainSection: { marginBottom: 16 },
  mainHead: { fontSize: 13, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 3 },
  mainLine: { borderBottomWidth: 2, borderBottomColor: '#1a1a1a', width: 32, marginBottom: 10 },
  entryJobTitle: { fontSize: 13, fontFamily: 'Helvetica-Bold', marginBottom: 2 },
  entryCompany: { fontSize: 10, color: '#333', marginBottom: 1 },
  entryMeta: { fontSize: 9, color: '#666', marginBottom: 5 },
  bullet: { flexDirection: 'row', marginBottom: 3 },
  dot: { marginRight: 5, color: '#333' },
  bulletText: { flex: 1, fontSize: 9.5, lineHeight: 1.45, color: '#222' },
  eduTitle: { fontSize: 10, fontFamily: 'Helvetica-Bold', marginBottom: 1 },
  eduSub: { fontSize: 9, color: '#555', marginBottom: 1 },
  eduMeta: { fontSize: 9, color: '#888' },
})

function ModernDoc({ resume: r, cfg }: { resume: Resume; cfg: TemplateConfig }) {
  const p = r.personalInfo
  const accent = cfg.accentColor
  const f = (bold = false) => fontFor(cfg, bold)
  const sp = (n: number) => pad(cfg, n)
  const title = p.summary ? p.summary.split('.')[0] : ''
  return (
    <Document>
      <Page size="LETTER" style={mod.page}>
        {/* Header */}
        <View style={{ ...mod.topBar, backgroundColor: accent, fontFamily: f() }}>
          <Text style={mod.topName}>{p.name || 'Your Name'}</Text>
          {title && <Text style={mod.topTitle}>{title.toUpperCase()}</Text>}
        </View>
        <View style={mod.body}>
          {/* Left sidebar */}
          <View style={{ ...mod.sidebar, fontFamily: f() }}>
            <View style={mod.sideSection}>
              <Text style={{ ...mod.sideHead, fontFamily: f(true) }}>Contact</Text>
              <View style={{ ...mod.sideLine, borderBottomColor: accent }} />
              {p.email    && <Text style={mod.sideText}>{p.email}</Text>}
              {p.phone    && <Text style={mod.sideText}>{p.phone}</Text>}
              {p.location && <Text style={mod.sideText}>{p.location}</Text>}
              {p.linkedin && <Text style={mod.sideLink}>{p.linkedin}</Text>}
              {p.website  && <Text style={mod.sideLink}>{p.website}</Text>}
            </View>
            {r.education.length > 0 && (
              <View style={mod.sideSection}>
                <Text style={{ ...mod.sideHead, fontFamily: f(true) }}>Education</Text>
                <View style={{ ...mod.sideLine, borderBottomColor: accent }} />
                {r.education.map(e => (
                  <View key={e.id} style={{ marginBottom: 8 }}>
                    <Text style={{ ...mod.sideText, fontFamily: 'Helvetica-Bold', color: '#222' }}>{e.degree}</Text>
                    {e.field ? <Text style={mod.sideText}>{e.field}</Text> : null}
                    <Text style={mod.sideText}>{e.school}</Text>
                    <Text style={{ ...mod.sideText, color: '#888' }}>{e.graduationDate}</Text>
                    {p.location ? <Text style={mod.sideText}>{p.location}</Text> : null}
                  </View>
                ))}
              </View>
            )}
            {r.skills.length > 0 && (
              <View style={mod.sideSection}>
                <Text style={{ ...mod.sideHead, fontFamily: f(true) }}>Skills</Text>
                <View style={{ ...mod.sideLine, borderBottomColor: accent }} />
                {r.skills.map(s => <Text key={s.id} style={mod.sideBullet}>{s.name}</Text>)}
              </View>
            )}
          </View>
          {/* Main */}
          <View style={{ ...mod.main, fontFamily: f() }}>
            {r.experience.length > 0 && (
              <View style={{ ...mod.mainSection, marginBottom: sp(16) }}>
                <Text style={{ ...mod.mainHead, fontFamily: f(true) }}>Work Experience</Text>
                <View style={{ ...mod.mainLine, borderBottomColor: accent }} />
                {r.experience.map(e => (
                  <View key={e.id} style={{ marginBottom: 12 }}>
                    <Text style={mod.entryJobTitle}>{e.title}</Text>
                    <Text style={mod.entryCompany}>{e.company}</Text>
                    <Text style={mod.entryMeta}>
                      {e.startDate} – {e.current ? 'current' : e.endDate}{p.location ? `  /  ${p.location}` : ''}
                    </Text>
                    {e.bullets.filter(Boolean).map((b, i) => (
                      <View key={i} style={mod.bullet}>
                        <Text style={mod.dot}>•</Text>
                        <Text style={mod.bulletText}>{b}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            )}
            {r.education.length > 0 && (
              <View style={{ ...mod.mainSection, marginBottom: sp(16) }}>
                <Text style={{ ...mod.mainHead, fontFamily: f(true) }}>Education</Text>
                <View style={{ ...mod.mainLine, borderBottomColor: accent }} />
                {r.education.map(e => (
                  <View key={e.id} style={{ marginBottom: 8 }}>
                    <Text style={mod.eduTitle}>{e.degree}{e.field ? ` in ${e.field}` : ''}</Text>
                    <Text style={mod.eduSub}>{e.school}</Text>
                    <Text style={mod.eduMeta}>{e.graduationDate}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  )
}

/* ─────────────────────────────────────────────
   SIDEBAR — Max Johnson dark navy style
   Dark sidebar · avatar circle · contact/skills/languages · clean main
───────────────────────────────────────────── */
const sb = StyleSheet.create({
  page: { fontFamily: 'Helvetica', fontSize: 10, color: '#1a1a1a', flexDirection: 'row' },
  sidebar: { width: 175, backgroundColor: '#1e2936', padding: 22, flexDirection: 'column' },
  avatar: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#4a9aba', alignSelf: 'center', marginBottom: 18, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontSize: 22, fontFamily: 'Helvetica-Bold' },
  sbSection: { marginBottom: 14 },
  sbHead: { fontSize: 13, fontFamily: 'Helvetica-Bold', color: '#fff', marginBottom: 4 },
  sbLine: { borderBottomWidth: 1.5, borderBottomColor: '#fff', width: 28, marginBottom: 8 },
  sbLabel: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: '#fff', marginBottom: 1 },
  sbValue: { fontSize: 9, color: '#b0c4d4', marginBottom: 6, lineHeight: 1.4 },
  sbBulletRow: { flexDirection: 'row', marginBottom: 3 },
  sbDot: { color: '#b0c4d4', marginRight: 5, fontSize: 9 },
  sbBulletText: { fontSize: 9, color: '#b0c4d4' },
  main: { flex: 1, padding: 28 },
  mainName: { fontSize: 26, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', letterSpacing: 1.5, color: '#1a1a1a', marginBottom: 4 },
  mainTitle: { fontSize: 13, color: '#555', marginBottom: 20 },
  section: { marginBottom: 14 },
  secHead: { fontSize: 13, fontFamily: 'Helvetica-Bold', marginBottom: 4 },
  secLine: { borderBottomWidth: 2, borderBottomColor: '#1a1a1a', width: 28, marginBottom: 8 },
  para: { fontSize: 9.5, color: '#333', lineHeight: 1.55 },
  expRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 1 },
  expTitle: { fontSize: 10, fontFamily: 'Helvetica-Bold' },
  expCompany: { fontSize: 9.5, color: '#333', marginBottom: 0.5 },
  expMeta: { fontSize: 9, color: '#666', marginBottom: 4 },
  expDate: { fontSize: 9, color: '#666' },
  bullet: { flexDirection: 'row', marginBottom: 2.5 },
  dot: { marginRight: 5 },
  bulletText: { flex: 1, fontSize: 9.5, lineHeight: 1.4 },
  eduTitle: { fontSize: 10, fontFamily: 'Helvetica-Bold', marginBottom: 1 },
  eduRow: { flexDirection: 'row', justifyContent: 'space-between' },
  eduSub: { fontSize: 9, color: '#555' },
  eduDate: { fontSize: 9, color: '#777' },
})

function SidebarDoc({ resume: r, cfg }: { resume: Resume; cfg: TemplateConfig }) {
  const p = r.personalInfo
  const accent = cfg.accentColor
  const f = (bold = false) => fontFor(cfg, bold)
  const sp = (n: number) => pad(cfg, n)
  const initials = p.name ? p.name.split(' ').map(n => n[0]).slice(0, 2).join('') : 'YN'
  const jobTitle = p.summary ? p.summary.split('.')[0] : ''
  return (
    <Document>
      <Page size="LETTER" style={{ ...sb.page, fontFamily: f() }}>
        {/* Dark sidebar */}
        <View style={{ ...sb.sidebar, backgroundColor: accent }}>
          <View style={sb.avatar}><Text style={sb.avatarText}>{initials}</Text></View>
          {/* Contact */}
          <View style={sb.sbSection}>
            <Text style={sb.sbHead}>Contact</Text>
            <View style={sb.sbLine} />
            {p.location && <><Text style={sb.sbLabel}>Address</Text><Text style={sb.sbValue}>{p.location}</Text></>}
            {p.phone    && <><Text style={sb.sbLabel}>Phone</Text><Text style={sb.sbValue}>{p.phone}</Text></>}
            {p.email    && <><Text style={sb.sbLabel}>Email</Text><Text style={sb.sbValue}>{p.email}</Text></>}
            {p.linkedin && <><Text style={sb.sbLabel}>LinkedIn</Text><Text style={sb.sbValue}>{p.linkedin}</Text></>}
          </View>
          {/* Skills */}
          {r.skills.length > 0 && (
            <View style={sb.sbSection}>
              <Text style={sb.sbHead}>Skills</Text>
              <View style={sb.sbLine} />
              {r.skills.map(s => (
                <View key={s.id} style={sb.sbBulletRow}>
                  <Text style={sb.sbDot}>•</Text>
                  <Text style={sb.sbBulletText}>{s.name}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
        {/* Main content */}
        <View style={sb.main}>
          <Text style={sb.mainName}>{p.name || 'Your Name'}</Text>
          {jobTitle ? <Text style={sb.mainTitle}>{jobTitle}</Text> : null}
          {/* Profile */}
          {p.summary && (
            <View style={sb.section}>
              <Text style={sb.secHead}>Profile</Text>
              <View style={sb.secLine} />
              <Text style={sb.para}>{p.summary}</Text>
            </View>
          )}
          {/* Work Experience */}
          {r.experience.length > 0 && (
            <View style={sb.section}>
              <Text style={sb.secHead}>Work Experience</Text>
              <View style={sb.secLine} />
              {r.experience.map(e => (
                <View key={e.id} style={{ marginBottom: 10 }}>
                  <Text style={sb.expTitle}>{e.title}</Text>
                  <View style={sb.expRow}>
                    <Text style={sb.expCompany}>{e.company}</Text>
                    <Text style={sb.expDate}>{e.startDate} – {e.current ? 'Present' : e.endDate}</Text>
                  </View>
                  {e.bullets.filter(Boolean).map((b, i) => (
                    <View key={i} style={sb.bullet}>
                      <Text style={sb.dot}>•</Text>
                      <Text style={sb.bulletText}>{b}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}
          {/* Education */}
          {r.education.length > 0 && (
            <View style={sb.section}>
              <Text style={sb.secHead}>Education</Text>
              <View style={sb.secLine} />
              {r.education.map(e => (
                <View key={e.id} style={{ marginBottom: 7 }}>
                  <Text style={sb.eduTitle}>{e.degree}{e.field ? ` in ${e.field}` : ''}</Text>
                  <View style={sb.eduRow}>
                    <Text style={sb.eduSub}>{e.school}</Text>
                    <Text style={sb.eduDate}>{e.graduationDate}</Text>
                  </View>
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
   MINIMAL — ultra-clean whitespace, thin typography
───────────────────────────────────────────── */
const min = StyleSheet.create({
  page: { fontFamily: 'Helvetica', fontSize: 10, color: '#111', padding: 52 },
  name: { fontSize: 26, fontFamily: 'Helvetica-Bold', letterSpacing: 0.5, marginBottom: 3 },
  title: { fontSize: 12, color: '#777', marginBottom: 5 },
  contact: { flexDirection: 'row', gap: 16, fontSize: 8.5, color: '#999', marginBottom: 28 },
  sec: { marginBottom: 18 },
  secHead: { fontSize: 8.5, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', letterSpacing: 2.5, color: '#999', marginBottom: 8 },
  expRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 1 },
  expTitle: { fontSize: 10.5, fontFamily: 'Helvetica-Bold' },
  expDate: { fontSize: 9, color: '#999' },
  expCompany: { fontSize: 9, color: '#777', marginBottom: 4 },
  bullet: { flexDirection: 'row', marginBottom: 2.5 },
  dash: { marginRight: 6, color: '#bbb' },
  bulletText: { flex: 1, fontSize: 9.5, lineHeight: 1.5, color: '#333' },
  eduTitle: { fontSize: 10, fontFamily: 'Helvetica-Bold', marginBottom: 1 },
  eduSub: { fontSize: 9, color: '#777' },
  skillRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 3 },
  skill: { fontSize: 9, color: '#555' },
})

function MinimalDoc({ resume: r, cfg }: { resume: Resume; cfg: TemplateConfig }) {
  const p = r.personalInfo
  const accent = cfg.accentColor
  const f = (bold = false) => fontFor(cfg, bold)
  const sp = (n: number) => pad(cfg, n)
  return (
    <Document>
      <Page size="LETTER" style={{ ...min.page, fontFamily: f() }}>
        <Text style={{ ...min.name, fontFamily: f(true) }}>{p.name || 'Your Name'}</Text>
        {p.summary && <Text style={min.title}>{p.summary.split('.')[0]}</Text>}
        <View style={min.contact}>
          {p.email    && <Text>{p.email}</Text>}
          {p.phone    && <Text>{p.phone}</Text>}
          {p.location && <Text>{p.location}</Text>}
          {p.linkedin && <Text>{p.linkedin}</Text>}
        </View>
        {p.summary && (
          <View style={min.sec}>
            <Text style={min.secHead}>Profile</Text>
            <Text style={{ fontSize: 9.5, lineHeight: 1.6, color: '#444' }}>{p.summary}</Text>
          </View>
        )}
        {r.experience.length > 0 && (
          <View style={min.sec}>
            <Text style={min.secHead}>Experience</Text>
            {r.experience.map(e => (
              <View key={e.id} style={{ marginBottom: 10 }}>
                <View style={min.expRow}>
                  <Text style={min.expTitle}>{e.title}</Text>
                  <Text style={min.expDate}>{e.startDate} – {e.current ? 'Present' : e.endDate}</Text>
                </View>
                <Text style={min.expCompany}>{e.company}</Text>
                {e.bullets.filter(Boolean).map((b, i) => (
                  <View key={i} style={min.bullet}>
                    <Text style={min.dash}>–</Text>
                    <Text style={min.bulletText}>{b}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}
        {r.education.length > 0 && (
          <View style={min.sec}>
            <Text style={min.secHead}>Education</Text>
            {r.education.map(e => (
              <View key={e.id} style={{ marginBottom: 6 }}>
                <View style={min.expRow}>
                  <Text style={min.eduTitle}>{e.degree}{e.field ? `, ${e.field}` : ''}</Text>
                  <Text style={min.expDate}>{e.graduationDate}</Text>
                </View>
                <Text style={min.eduSub}>{e.school}</Text>
              </View>
            ))}
          </View>
        )}
        {r.skills.length > 0 && (
          <View style={min.sec}>
            <Text style={min.secHead}>Skills</Text>
            <View style={min.skillRow}>
              {r.skills.map((s, i) => (
                <Text key={s.id} style={min.skill}>{s.name}{i < r.skills.length - 1 ? '  ·' : ''}</Text>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  )
}

/* ─────────────────────────────────────────────
   BOLD — deep purple header, strong accent bullets
───────────────────────────────────────────── */
const bld = StyleSheet.create({
  page: { fontFamily: 'Helvetica', fontSize: 10, color: '#1a1a1a' },
  header: { backgroundColor: '#5b21b6', paddingHorizontal: 40, paddingVertical: 26 },
  name: { fontSize: 24, fontFamily: 'Helvetica-Bold', color: '#fff', letterSpacing: 1, marginBottom: 4 },
  title: { fontSize: 11, color: '#ddd6fe', marginBottom: 8 },
  contactRow: { flexDirection: 'row', gap: 14, fontSize: 9, color: '#c4b5fd' },
  body: { paddingHorizontal: 40, paddingTop: 20 },
  sec: { marginBottom: 14 },
  secRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 3 },
  accentBar: { width: 4, height: 13, backgroundColor: '#5b21b6', borderRadius: 2 },
  secHead: { fontSize: 12, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', letterSpacing: 1, color: '#1a1a1a' },
  secLine: { borderBottomWidth: 1, borderBottomColor: '#ddd6fe', marginBottom: 9 },
  expTitle: { fontSize: 10.5, fontFamily: 'Helvetica-Bold' },
  expRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  expCompany: { fontSize: 9.5, color: '#5b21b6', marginBottom: 3 },
  expDate: { fontSize: 9, color: '#666' },
  bullet: { flexDirection: 'row', marginBottom: 2.5, paddingLeft: 6 },
  arrowDot: { marginRight: 5, color: '#5b21b6', fontFamily: 'Helvetica-Bold' },
  bulletText: { flex: 1, fontSize: 9.5, lineHeight: 1.4 },
  skillBadge: { backgroundColor: '#ede9fe', color: '#5b21b6', fontSize: 9, paddingHorizontal: 7, paddingVertical: 2.5, borderRadius: 3, marginRight: 5, marginBottom: 5 },
  skillRow: { flexDirection: 'row', flexWrap: 'wrap' },
})

function BoldDoc({ resume: r, cfg }: { resume: Resume; cfg: TemplateConfig }) {
  const p = r.personalInfo
  const accent = cfg.accentColor
  const f = (bold = false) => fontFor(cfg, bold)
  const sp = (n: number) => pad(cfg, n)
  return (
    <Document>
      <Page size="LETTER" style={{ ...bld.page, fontFamily: f() }}>
        <View style={{ ...bld.header, backgroundColor: accent }}>
          <Text style={bld.name}>{p.name || 'Your Name'}</Text>
          {p.summary && <Text style={bld.title}>{p.summary.split('.')[0]}</Text>}
          <View style={bld.contactRow}>
            {p.email    && <Text>{p.email}</Text>}
            {p.phone    && <Text>{p.phone}</Text>}
            {p.location && <Text>{p.location}</Text>}
          </View>
        </View>
        <View style={bld.body}>
          {p.summary && (
            <View style={bld.sec}>
              <View style={bld.secRow}><View style={bld.accentBar} /><Text style={bld.secHead}>Summary</Text></View>
              <View style={bld.secLine} />
              <Text style={{ fontSize: 9.5, lineHeight: 1.5, color: '#374151' }}>{p.summary}</Text>
            </View>
          )}
          {r.experience.length > 0 && (
            <View style={bld.sec}>
              <View style={bld.secRow}><View style={bld.accentBar} /><Text style={bld.secHead}>Experience</Text></View>
              <View style={bld.secLine} />
              {r.experience.map(e => (
                <View key={e.id} style={{ marginBottom: 10 }}>
                  <View style={bld.expRow}>
                    <Text style={bld.expTitle}>{e.title}</Text>
                    <Text style={bld.expDate}>{e.startDate} – {e.current ? 'Present' : e.endDate}</Text>
                  </View>
                  <Text style={bld.expCompany}>{e.company}</Text>
                  {e.bullets.filter(Boolean).map((b, i) => (
                    <View key={i} style={bld.bullet}>
                      <Text style={bld.arrowDot}>▸</Text>
                      <Text style={bld.bulletText}>{b}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}
          {r.education.length > 0 && (
            <View style={bld.sec}>
              <View style={bld.secRow}><View style={bld.accentBar} /><Text style={bld.secHead}>Education</Text></View>
              <View style={bld.secLine} />
              {r.education.map(e => (
                <View key={e.id} style={{ marginBottom: 7 }}>
                  <View style={bld.expRow}>
                    <Text style={bld.expTitle}>{e.school}</Text>
                    <Text style={bld.expDate}>{e.graduationDate}</Text>
                  </View>
                  <Text style={{ fontSize: 9.5, color: '#5b21b6' }}>{e.degree}{e.field ? `, ${e.field}` : ''}</Text>
                </View>
              ))}
            </View>
          )}
          {r.skills.length > 0 && (
            <View style={bld.sec}>
              <View style={bld.secRow}><View style={bld.accentBar} /><Text style={bld.secHead}>Skills</Text></View>
              <View style={bld.secLine} />
              <View style={bld.skillRow}>
                {r.skills.map(s => <Text key={s.id} style={bld.skillBadge}>{s.name}</Text>)}
              </View>
            </View>
          )}
        </View>
      </Page>
    </Document>
  )
}

/* ─────────────────────────────────────────────
   CLEAN — amber accent, centered serif header, elegant borders
───────────────────────────────────────────── */
const cln = StyleSheet.create({
  page: { fontFamily: 'Helvetica', fontSize: 10, color: '#1c1917', padding: 44 },
  header: { alignItems: 'center', borderBottomWidth: 2.5, borderBottomColor: '#b45309', paddingBottom: 14, marginBottom: 16 },
  name: { fontSize: 24, fontFamily: 'Helvetica-Bold', color: '#1c1917', letterSpacing: 1, marginBottom: 4 },
  title: { fontSize: 11, color: '#b45309', letterSpacing: 0.5, marginBottom: 7 },
  contactRow: { flexDirection: 'row', gap: 16, fontSize: 9, color: '#78716c' },
  sec: { marginBottom: 15 },
  secHead: { fontSize: 10.5, fontFamily: 'Helvetica-Bold', color: '#b45309', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 6 },
  entryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  entryTitle: { fontSize: 10.5, fontFamily: 'Helvetica-Bold' },
  entryDate: { fontSize: 9, color: '#78716c' },
  entrySub: { fontSize: 9.5, color: '#57534e', marginBottom: 4 },
  bullet: { flexDirection: 'row', marginBottom: 2.5 },
  accentDot: { marginRight: 5, color: '#b45309' },
  bulletText: { flex: 1, fontSize: 9.5, lineHeight: 1.4, color: '#44403c' },
  skillBadge: { borderWidth: 1, borderColor: '#e7d5bb', color: '#57534e', fontSize: 9, paddingHorizontal: 8, paddingVertical: 2.5, borderRadius: 10, marginRight: 5, marginBottom: 5 },
  skillRow: { flexDirection: 'row', flexWrap: 'wrap' },
  divider: { borderBottomWidth: 0.5, borderBottomColor: '#e7d5bb', marginBottom: 8 },
})

function CleanDoc({ resume: r, cfg }: { resume: Resume; cfg: TemplateConfig }) {
  const p = r.personalInfo
  const accent = cfg.accentColor
  const f = (bold = false) => fontFor(cfg, bold)
  const sp = (n: number) => pad(cfg, n)
  return (
    <Document>
      <Page size="LETTER" style={{ ...cln.page, fontFamily: f() }}>
        <View style={{ ...cln.header, borderBottomColor: accent }}>
          <Text style={cln.name}>{p.name || 'Your Name'}</Text>
          {p.summary && <Text style={cln.title}>{p.summary.split('.')[0]}</Text>}
          <View style={cln.contactRow}>
            {p.email    && <Text>{p.email}</Text>}
            {p.phone    && <Text>{p.phone}</Text>}
            {p.location && <Text>{p.location}</Text>}
            {p.linkedin && <Text>{p.linkedin}</Text>}
          </View>
        </View>
        {p.summary && (
          <View style={cln.sec}>
            <Text style={cln.secHead}>Profile</Text>
            <View style={cln.divider} />
            <Text style={{ fontSize: 9.5, lineHeight: 1.65, color: '#57534e' }}>{p.summary}</Text>
          </View>
        )}
        {r.experience.length > 0 && (
          <View style={cln.sec}>
            <Text style={cln.secHead}>Experience</Text>
            <View style={cln.divider} />
            {r.experience.map(e => (
              <View key={e.id} style={{ marginBottom: 10 }}>
                <View style={cln.entryRow}>
                  <Text style={cln.entryTitle}>{e.title}</Text>
                  <Text style={cln.entryDate}>{e.startDate} – {e.current ? 'Present' : e.endDate}</Text>
                </View>
                <Text style={cln.entrySub}>{e.company}</Text>
                {e.bullets.filter(Boolean).map((b, i) => (
                  <View key={i} style={cln.bullet}>
                    <Text style={cln.accentDot}>▪</Text>
                    <Text style={cln.bulletText}>{b}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}
        {r.education.length > 0 && (
          <View style={cln.sec}>
            <Text style={cln.secHead}>Education</Text>
            <View style={cln.divider} />
            {r.education.map(e => (
              <View key={e.id} style={{ marginBottom: 7 }}>
                <View style={cln.entryRow}>
                  <Text style={cln.entryTitle}>{e.school}</Text>
                  <Text style={cln.entryDate}>{e.graduationDate}</Text>
                </View>
                <Text style={cln.entrySub}>{e.degree}{e.field ? `, ${e.field}` : ''}</Text>
              </View>
            ))}
          </View>
        )}
        {r.skills.length > 0 && (
          <View style={cln.sec}>
            <Text style={cln.secHead}>Skills</Text>
            <View style={cln.divider} />
            <View style={cln.skillRow}>
              {r.skills.map(s => <Text key={s.id} style={cln.skillBadge}>{s.name}</Text>)}
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
const DOCS: Record<TemplateId, React.FC<{ resume: Resume; cfg: TemplateConfig }>> = {
  classic: ClassicDoc,
  modern:  ModernDoc,
  minimal: MinimalDoc,
  bold:    BoldDoc,
  sidebar: SidebarDoc,
  clean:   CleanDoc,
}

export const TEMPLATE_DEFAULTS: Record<TemplateId, string> = {
  classic: '#1a1a1a',
  modern:  '#2a7d7b',
  minimal: '#374151',
  bold:    '#5b21b6',
  sidebar: '#1e2936',
  clean:   '#b45309',
}

export default function ResumeDocument({
  resume,
  templateId = 'classic',
  config,
}: {
  resume: Resume
  templateId?: TemplateId
  config?: Partial<TemplateConfig>
}) {
  const cfg: TemplateConfig = {
    accentColor: config?.accentColor ?? TEMPLATE_DEFAULTS[templateId],
    font: config?.font ?? 'sans',
    spacing: config?.spacing ?? 'normal',
  }
  const Doc = DOCS[templateId] ?? ClassicDoc
  return <Doc resume={resume} cfg={cfg} />
}
