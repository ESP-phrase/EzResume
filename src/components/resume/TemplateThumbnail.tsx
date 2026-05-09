import type { TemplateId } from '@/types/resume'

const SAMPLE = {
  name: 'Alex Johnson',
  title: 'Senior Product Manager',
  email: 'alex@email.com',
  phone: '(555) 012-3456',
  location: 'San Francisco, CA',
  summary: 'Results-driven PM with 6+ years leading cross-functional teams and shipping products used by millions.',
  exp: [
    {
      role: 'Senior Product Manager',
      company: 'Stripe',
      date: '2021 – Present',
      bullets: [
        'Led 0→1 launch of payments dashboard, driving $2M ARR',
        'Managed roadmap for 4 engineers and 2 designers',
        'Reduced onboarding drop-off by 38% via A/B testing',
      ],
    },
    {
      role: 'Product Manager',
      company: 'Airbnb',
      date: '2018 – 2021',
      bullets: [
        'Owned host tools product with 800K monthly active users',
        'Shipped 12 features across web and mobile platforms',
      ],
    },
  ],
  edu: { school: 'UC Berkeley', degree: 'B.S. Computer Science', date: '2018' },
  skills: ['Product Strategy', 'Agile', 'SQL', 'Figma', 'Python', 'Roadmapping'],
}

const s = {
  // font sizes
  name: { fontSize: 7, fontWeight: 700, lineHeight: 1.2 } as React.CSSProperties,
  title: { fontSize: 4.5, lineHeight: 1.3 } as React.CSSProperties,
  contact: { fontSize: 3.5, lineHeight: 1.4 } as React.CSSProperties,
  sectionHead: { fontSize: 4.5, fontWeight: 700, lineHeight: 1.4, letterSpacing: 0.5, textTransform: 'uppercase' as const },
  jobTitle: { fontSize: 4.5, fontWeight: 600, lineHeight: 1.3 } as React.CSSProperties,
  company: { fontSize: 4, lineHeight: 1.3 } as React.CSSProperties,
  date: { fontSize: 3.5, lineHeight: 1.3 } as React.CSSProperties,
  bullet: { fontSize: 3.5, lineHeight: 1.5 } as React.CSSProperties,
  summary: { fontSize: 3.5, lineHeight: 1.6 } as React.CSSProperties,
  skill: { fontSize: 3.5, lineHeight: 1.3 } as React.CSSProperties,
}

function ClassicThumb() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', padding: 8, fontFamily: 'Georgia, serif', display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 2 }}>
        <div style={{ ...s.name, color: '#1e293b' }}>{SAMPLE.name}</div>
        <div style={{ ...s.title, color: '#475569' }}>{SAMPLE.title}</div>
        <div style={{ ...s.contact, color: '#64748b', marginTop: 1 }}>{SAMPLE.email} · {SAMPLE.phone} · {SAMPLE.location}</div>
      </div>
      <div style={{ borderBottom: '1.5px solid #1e293b', marginBottom: 2 }} />
      {/* Experience */}
      <div style={{ ...s.sectionHead, color: '#1e293b', borderBottom: '0.5px solid #cbd5e1', paddingBottom: 1, marginBottom: 2 }}>Experience</div>
      {SAMPLE.exp.map((e, i) => (
        <div key={i} style={{ marginBottom: 3 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ ...s.jobTitle, color: '#1e293b' }}>{e.role}</div>
            <div style={{ ...s.date, color: '#64748b' }}>{e.date}</div>
          </div>
          <div style={{ ...s.company, color: '#475569', marginBottom: 1 }}>{e.company}</div>
          {e.bullets.map((b, j) => (
            <div key={j} style={{ display: 'flex', gap: 2, ...s.bullet, color: '#475569' }}>
              <span style={{ marginTop: 0.5 }}>•</span><span>{b}</span>
            </div>
          ))}
        </div>
      ))}
      {/* Education */}
      <div style={{ ...s.sectionHead, color: '#1e293b', borderBottom: '0.5px solid #cbd5e1', paddingBottom: 1, marginBottom: 2 }}>Education</div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <div style={{ ...s.jobTitle, color: '#1e293b' }}>{SAMPLE.edu.school}</div>
          <div style={{ ...s.company, color: '#475569' }}>{SAMPLE.edu.degree}</div>
        </div>
        <div style={{ ...s.date, color: '#64748b' }}>{SAMPLE.edu.date}</div>
      </div>
      {/* Skills */}
      <div style={{ ...s.sectionHead, color: '#1e293b', borderBottom: '0.5px solid #cbd5e1', paddingBottom: 1, marginTop: 2, marginBottom: 2 }}>Skills</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {SAMPLE.skills.map(sk => (
          <span key={sk} style={{ ...s.skill, color: '#475569' }}>{sk} ·</span>
        ))}
      </div>
    </div>
  )
}

function ModernThumb() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', fontFamily: 'Arial, sans-serif', display: 'flex', flexDirection: 'column' }}>
      {/* Blue header */}
      <div style={{ background: '#1d4ed8', padding: '8px 8px 6px', marginBottom: 4 }}>
        <div style={{ ...s.name, color: '#fff' }}>{SAMPLE.name}</div>
        <div style={{ ...s.title, color: '#bfdbfe', marginTop: 1 }}>{SAMPLE.title}</div>
        <div style={{ ...s.contact, color: '#93c5fd', marginTop: 2 }}>{SAMPLE.email} · {SAMPLE.phone} · {SAMPLE.location}</div>
      </div>
      <div style={{ padding: '0 8px', display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Summary */}
        <div>
          <div style={{ ...s.sectionHead, color: '#1d4ed8', borderBottom: '1px solid #bfdbfe', paddingBottom: 1, marginBottom: 2 }}>Summary</div>
          <div style={{ ...s.summary, color: '#475569' }}>{SAMPLE.summary}</div>
        </div>
        {/* Experience */}
        <div>
          <div style={{ ...s.sectionHead, color: '#1d4ed8', borderBottom: '1px solid #bfdbfe', paddingBottom: 1, marginBottom: 2 }}>Experience</div>
          {SAMPLE.exp.map((e, i) => (
            <div key={i} style={{ marginBottom: 3 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ ...s.jobTitle, color: '#1e293b' }}>{e.role} — {e.company}</div>
                <div style={{ ...s.date, color: '#64748b' }}>{e.date}</div>
              </div>
              {e.bullets.slice(0, 2).map((b, j) => (
                <div key={j} style={{ display: 'flex', gap: 2, ...s.bullet, color: '#475569' }}>
                  <span style={{ color: '#1d4ed8', fontWeight: 700 }}>›</span><span>{b}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* Skills */}
        <div>
          <div style={{ ...s.sectionHead, color: '#1d4ed8', borderBottom: '1px solid #bfdbfe', paddingBottom: 1, marginBottom: 2 }}>Skills</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {SAMPLE.skills.map(sk => (
              <span key={sk} style={{ ...s.skill, background: '#eff6ff', color: '#1d4ed8', padding: '0.5px 3px', borderRadius: 2 }}>{sk}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function MinimalThumb() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', padding: 10, fontFamily: 'Helvetica, sans-serif', display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* Header */}
      <div>
        <div style={{ ...s.name, color: '#111827', fontWeight: 300, fontSize: 8 }}>{SAMPLE.name}</div>
        <div style={{ ...s.title, color: '#6b7280', fontWeight: 400, marginTop: 1 }}>{SAMPLE.title}</div>
        <div style={{ ...s.contact, color: '#9ca3af', marginTop: 2 }}>{SAMPLE.email}  {SAMPLE.phone}  {SAMPLE.location}</div>
      </div>
      {/* Experience */}
      <div>
        <div style={{ ...s.sectionHead, color: '#9ca3af', fontSize: 3.5, marginBottom: 2 }}>Experience</div>
        {SAMPLE.exp.map((e, i) => (
          <div key={i} style={{ marginBottom: 3 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ ...s.jobTitle, color: '#111827', fontWeight: 500 }}>{e.role}</div>
              <div style={{ ...s.date, color: '#9ca3af' }}>{e.date}</div>
            </div>
            <div style={{ ...s.company, color: '#6b7280', marginBottom: 1 }}>{e.company}</div>
            {e.bullets.slice(0, 2).map((b, j) => (
              <div key={j} style={{ display: 'flex', gap: 2, ...s.bullet, color: '#6b7280' }}>
                <span>–</span><span>{b}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* Education */}
      <div>
        <div style={{ ...s.sectionHead, color: '#9ca3af', fontSize: 3.5, marginBottom: 2 }}>Education</div>
        <div style={{ ...s.jobTitle, color: '#111827', fontWeight: 500 }}>{SAMPLE.edu.school}</div>
        <div style={{ ...s.company, color: '#6b7280' }}>{SAMPLE.edu.degree} · {SAMPLE.edu.date}</div>
      </div>
      {/* Skills */}
      <div>
        <div style={{ ...s.sectionHead, color: '#9ca3af', fontSize: 3.5, marginBottom: 2 }}>Skills</div>
        <div style={{ ...s.skill, color: '#6b7280' }}>{SAMPLE.skills.join('  ·  ')}</div>
      </div>
    </div>
  )
}

function BoldThumb() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', fontFamily: 'Arial, sans-serif', display: 'flex', flexDirection: 'column' }}>
      {/* Purple header */}
      <div style={{ background: '#7c3aed', padding: '8px 8px 7px' }}>
        <div style={{ ...s.name, color: '#fff', fontSize: 8 }}>{SAMPLE.name}</div>
        <div style={{ ...s.title, color: '#ddd6fe', marginTop: 1.5 }}>{SAMPLE.title}</div>
        <div style={{ ...s.contact, color: '#c4b5fd', marginTop: 2 }}>{SAMPLE.email} · {SAMPLE.location}</div>
      </div>
      <div style={{ padding: '5px 8px', display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Experience */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 2 }}>
            <div style={{ width: 2.5, height: 2.5, background: '#7c3aed', borderRadius: '50%' }} />
            <div style={{ ...s.sectionHead, color: '#7c3aed', fontSize: 4 }}>Experience</div>
          </div>
          {SAMPLE.exp.map((e, i) => (
            <div key={i} style={{ marginBottom: 3 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ ...s.jobTitle, color: '#1e293b' }}>{e.role}</div>
                <div style={{ ...s.date, color: '#64748b' }}>{e.date}</div>
              </div>
              <div style={{ ...s.company, color: '#7c3aed', marginBottom: 1 }}>{e.company}</div>
              {e.bullets.slice(0, 2).map((b, j) => (
                <div key={j} style={{ display: 'flex', gap: 2, ...s.bullet, color: '#475569' }}>
                  <span style={{ color: '#7c3aed', fontWeight: 700, fontSize: 5 }}>▸</span><span>{b}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* Skills */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 2 }}>
            <div style={{ width: 2.5, height: 2.5, background: '#7c3aed', borderRadius: '50%' }} />
            <div style={{ ...s.sectionHead, color: '#7c3aed', fontSize: 4 }}>Skills</div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {SAMPLE.skills.map(sk => (
              <span key={sk} style={{ ...s.skill, background: '#f5f3ff', color: '#7c3aed', padding: '0.5px 3px', borderRadius: 2 }}>{sk}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function SidebarThumb() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', fontFamily: 'Arial, sans-serif', display: 'flex', flexDirection: 'row' }}>
      {/* Teal sidebar */}
      <div style={{ width: '38%', background: '#0f766e', padding: '8px 5px', display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Avatar */}
        <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#2dd4bf', margin: '0 auto 3px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 7, color: '#fff', fontWeight: 700 }}>AJ</span>
        </div>
        <div style={{ ...s.name, color: '#fff', fontSize: 5, textAlign: 'center', lineHeight: 1.3 }}>{SAMPLE.name}</div>
        <div style={{ ...s.title, color: '#99f6e4', textAlign: 'center', fontSize: 3.5 }}>{SAMPLE.title}</div>
        <div style={{ borderTop: '0.5px solid #2dd4bf', marginTop: 2, paddingTop: 2 }}>
          <div style={{ ...s.sectionHead, color: '#2dd4bf', fontSize: 3.5, marginBottom: 2 }}>Contact</div>
          {[SAMPLE.email, SAMPLE.phone, SAMPLE.location].map((c, i) => (
            <div key={i} style={{ ...s.contact, color: '#99f6e4' }}>{c}</div>
          ))}
        </div>
        <div style={{ borderTop: '0.5px solid #2dd4bf', marginTop: 1, paddingTop: 2 }}>
          <div style={{ ...s.sectionHead, color: '#2dd4bf', fontSize: 3.5, marginBottom: 2 }}>Skills</div>
          {SAMPLE.skills.map(sk => (
            <div key={sk} style={{ ...s.skill, color: '#ccfbf1' }}>· {sk}</div>
          ))}
        </div>
      </div>
      {/* Main */}
      <div style={{ flex: 1, padding: '8px 6px', display: 'flex', flexDirection: 'column', gap: 3 }}>
        <div style={{ ...s.sectionHead, color: '#0f766e', borderBottom: '1px solid #99f6e4', paddingBottom: 1, marginBottom: 2 }}>Experience</div>
        {SAMPLE.exp.map((e, i) => (
          <div key={i} style={{ marginBottom: 3 }}>
            <div style={{ ...s.jobTitle, color: '#1e293b' }}>{e.role}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ ...s.company, color: '#0f766e' }}>{e.company}</div>
              <div style={{ ...s.date, color: '#64748b' }}>{e.date}</div>
            </div>
            {e.bullets.slice(0, 2).map((b, j) => (
              <div key={j} style={{ display: 'flex', gap: 2, ...s.bullet, color: '#475569' }}>
                <span style={{ color: '#0f766e' }}>•</span><span>{b}</span>
              </div>
            ))}
          </div>
        ))}
        <div style={{ ...s.sectionHead, color: '#0f766e', borderBottom: '1px solid #99f6e4', paddingBottom: 1, marginBottom: 2 }}>Education</div>
        <div style={{ ...s.jobTitle, color: '#1e293b' }}>{SAMPLE.edu.school}</div>
        <div style={{ ...s.company, color: '#475569' }}>{SAMPLE.edu.degree} · {SAMPLE.edu.date}</div>
      </div>
    </div>
  )
}

function CleanThumb() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', padding: 8, fontFamily: 'Georgia, serif', display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Centered header */}
      <div style={{ textAlign: 'center', paddingBottom: 3, borderBottom: '2px solid #b45309' }}>
        <div style={{ ...s.name, color: '#1c1917', fontSize: 8 }}>{SAMPLE.name}</div>
        <div style={{ ...s.title, color: '#b45309', marginTop: 1 }}>{SAMPLE.title}</div>
        <div style={{ ...s.contact, color: '#78716c', marginTop: 1.5 }}>{SAMPLE.email} · {SAMPLE.phone} · {SAMPLE.location}</div>
      </div>
      {/* Summary */}
      <div>
        <div style={{ ...s.sectionHead, color: '#b45309', marginBottom: 1.5 }}>Profile</div>
        <div style={{ ...s.summary, color: '#57534e' }}>{SAMPLE.summary}</div>
      </div>
      {/* Experience */}
      <div>
        <div style={{ ...s.sectionHead, color: '#b45309', marginBottom: 1.5 }}>Experience</div>
        {SAMPLE.exp.map((e, i) => (
          <div key={i} style={{ marginBottom: 3 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ ...s.jobTitle, color: '#1c1917' }}>{e.role} · {e.company}</div>
              <div style={{ ...s.date, color: '#78716c' }}>{e.date}</div>
            </div>
            {e.bullets.slice(0, 2).map((b, j) => (
              <div key={j} style={{ display: 'flex', gap: 2, ...s.bullet, color: '#57534e' }}>
                <span style={{ color: '#b45309' }}>▪</span><span>{b}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* Skills */}
      <div>
        <div style={{ ...s.sectionHead, color: '#b45309', marginBottom: 1.5 }}>Skills</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {SAMPLE.skills.map(sk => (
            <span key={sk} style={{ ...s.skill, color: '#57534e', border: '0.5px solid #d6d3d1', padding: '0.5px 3px', borderRadius: 2 }}>{sk}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

const THUMBS: Record<TemplateId, React.FC> = {
  classic: ClassicThumb,
  modern: ModernThumb,
  minimal: MinimalThumb,
  bold: BoldThumb,
  sidebar: SidebarThumb,
  clean: CleanThumb,
}

export default function TemplateThumbnail({ id }: { id: TemplateId }) {
  const Thumb = THUMBS[id]
  return <Thumb />
}
