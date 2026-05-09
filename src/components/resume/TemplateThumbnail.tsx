import type { TemplateId } from '@/types/resume'

const NAME = 'Alex Johnson'
const TITLE = 'Senior Product Manager'
const EMAIL = 'alex@email.com'
const PHONE = '(555) 012-3456'
const LOC = 'San Francisco, CA'
const SUMMARY = 'Results-driven PM with 6+ years leading cross-functional teams and shipping products used by millions of users globally.'
const EXP = [
  { role: 'Senior Product Manager', company: 'Stripe', date: '2021 – Present', bullets: ['Led 0→1 launch of payments dashboard, driving $2M ARR', 'Reduced onboarding drop-off by 38% via A/B testing', 'Managed roadmap for 4 engineers and 2 designers'] },
  { role: 'Product Manager', company: 'Airbnb', date: '2018 – 2021', bullets: ['Owned host tools with 800K monthly active users', 'Shipped 12 features across web and mobile'] },
]
const EDU = { school: 'UC Berkeley', degree: 'B.S. Computer Science', date: '2018' }
const SKILLS = ['Product Strategy', 'Agile', 'SQL', 'Figma', 'Python', 'Roadmapping', 'A/B Testing', 'Analytics']

/* ── Classic: centered uppercase name, bold sections, dark footer ── */
function ClassicThumb() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', fontFamily: 'Georgia, serif', display: 'flex', flexDirection: 'column', paddingBottom: 14, position: 'relative' }}>
      <div style={{ textAlign: 'center', padding: '8px 8px 4px' }}>
        <div style={{ fontSize: 7.5, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', color: '#1a1a1a' }}>{NAME}</div>
        <div style={{ fontSize: 4.5, color: '#555', marginTop: 1 }}>{TITLE}</div>
        <div style={{ fontSize: 3.5, color: '#666', marginTop: 2, display: 'flex', justifyContent: 'center', gap: 6 }}>
          <span>☏ {PHONE}</span><span>✉ {EMAIL}</span><span>⊙ {LOC}</span>
        </div>
      </div>
      <div style={{ borderBottom: '1px solid #bbb', margin: '2px 8px 4px' }} />
      {[
        { title: 'ABOUT ME', content: <div style={{ fontSize: 3.5, color: '#333', lineHeight: 1.5 }}>{SUMMARY}</div> },
        { title: 'WORK EXPERIENCE', content: EXP.map((e, i) => (
          <div key={i} style={{ marginBottom: 3 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 4, fontWeight: 700 }}>{e.role}</span>
              <span style={{ fontSize: 3.5, color: '#666' }}>{e.date}</span>
            </div>
            <div style={{ fontSize: 3.5, color: '#555', marginBottom: 1 }}>{e.company}</div>
            {e.bullets.slice(0, 2).map((b, j) => <div key={j} style={{ fontSize: 3.2, color: '#444', display: 'flex', gap: 2 }}><span>•</span><span>{b}</span></div>)}
          </div>
        )) },
        { title: 'SKILLS', content: (
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 3 }}>
            {SKILLS.map((s, i) => <div key={i} style={{ width: '30%', fontSize: 3.5, color: '#333', display: 'flex', gap: 2 }}><span>•</span><span>{s}</span></div>)}
          </div>
        )},
      ].map(({ title, content }) => (
        <div key={title} style={{ padding: '0 8px', marginBottom: 4 }}>
          <div style={{ fontSize: 4, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', color: '#1a1a1a', borderBottom: '1.5px solid #1a1a1a', paddingBottom: 1, marginBottom: 3 }}>{title}</div>
          {content}
        </div>
      ))}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 10, background: '#2d2d2d' }} />
    </div>
  )
}

/* ── Modern: teal header, left sidebar + main ── */
function ModernThumb() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', fontFamily: 'Arial, sans-serif', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: '#2a7d7b', padding: '7px 10px', textAlign: 'center' }}>
        <div style={{ fontSize: 7.5, fontWeight: 800, color: '#fff', letterSpacing: 1.5, textTransform: 'uppercase' }}>{NAME}</div>
        <div style={{ fontSize: 4, color: '#d0f0ef', letterSpacing: 1, fontStyle: 'italic', marginTop: 1.5 }}>{TITLE.toUpperCase()}</div>
      </div>
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        <div style={{ width: '32%', background: '#f7f7f7', borderRight: '1px solid #e5e5e5', padding: '6px 5px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            { h: 'CONTACT', items: [EMAIL, PHONE, LOC] },
            { h: 'EDUCATION', items: [EDU.degree, EDU.school, EDU.date] },
            { h: 'SKILLS', items: SKILLS.slice(0, 5) },
          ].map(({ h, items }) => (
            <div key={h}>
              <div style={{ fontSize: 4, fontWeight: 800, letterSpacing: 0.8, textAlign: 'center', marginBottom: 2 }}>{h}</div>
              <div style={{ width: 16, height: 1.5, background: '#2a7d7b', margin: '0 auto 3px' }} />
              {items.map((t, i) => <div key={i} style={{ fontSize: 3.5, color: '#555', textAlign: 'center', lineHeight: 1.5 }}>{t}</div>)}
            </div>
          ))}
        </div>
        {/* Main */}
        <div style={{ flex: 1, padding: '6px 7px', display: 'flex', flexDirection: 'column', gap: 5 }}>
          <div>
            <div style={{ fontSize: 5, fontWeight: 800, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 2 }}>Work Experience</div>
            <div style={{ width: 16, height: 2, background: '#1a1a1a', marginBottom: 4 }} />
            {EXP.map((e, i) => (
              <div key={i} style={{ marginBottom: 4 }}>
                <div style={{ fontSize: 5, fontWeight: 700 }}>{e.role}</div>
                <div style={{ fontSize: 3.5, color: '#333' }}>{e.company}</div>
                <div style={{ fontSize: 3.2, color: '#777', marginBottom: 2 }}>{e.date} / {LOC}</div>
                {e.bullets.slice(0, 2).map((b, j) => <div key={j} style={{ fontSize: 3.2, display: 'flex', gap: 2, color: '#333' }}><span>•</span><span>{b}</span></div>)}
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 5, fontWeight: 800, textTransform: 'uppercase', marginBottom: 2 }}>Education</div>
            <div style={{ width: 16, height: 2, background: '#1a1a1a', marginBottom: 4 }} />
            <div style={{ fontSize: 4, fontWeight: 700 }}>{EDU.degree}</div>
            <div style={{ fontSize: 3.5, color: '#555' }}>{EDU.school}</div>
            <div style={{ fontSize: 3.2, color: '#888' }}>{EDU.date}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Minimal: ultra clean whitespace ── */
function MinimalThumb() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', fontFamily: 'Helvetica, sans-serif', padding: '12px 12px 10px', display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div>
        <div style={{ fontSize: 8, fontWeight: 700, color: '#111', letterSpacing: 0.5 }}>{NAME}</div>
        <div style={{ fontSize: 4.5, color: '#777', marginTop: 1 }}>{TITLE}</div>
        <div style={{ fontSize: 3.5, color: '#aaa', marginTop: 2, display: 'flex', gap: 8 }}>
          <span>{EMAIL}</span><span>{PHONE}</span><span>{LOC}</span>
        </div>
      </div>
      {[
        { label: 'PROFILE', body: <div style={{ fontSize: 3.5, color: '#444', lineHeight: 1.6 }}>{SUMMARY}</div> },
        { label: 'EXPERIENCE', body: EXP.map((e, i) => (
          <div key={i} style={{ marginBottom: 4 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 4, fontWeight: 700 }}>{e.role}</span>
              <span style={{ fontSize: 3.5, color: '#aaa' }}>{e.date}</span>
            </div>
            <div style={{ fontSize: 3.5, color: '#888', marginBottom: 1.5 }}>{e.company}</div>
            {e.bullets.slice(0, 2).map((b, j) => <div key={j} style={{ fontSize: 3.2, color: '#555', display: 'flex', gap: 2 }}><span style={{ color: '#bbb' }}>–</span><span>{b}</span></div>)}
          </div>
        ))},
        { label: 'SKILLS', body: <div style={{ fontSize: 3.5, color: '#666' }}>{SKILLS.join('  ·  ')}</div> },
      ].map(({ label, body }) => (
        <div key={label}>
          <div style={{ fontSize: 3.5, fontWeight: 800, letterSpacing: 2.5, textTransform: 'uppercase', color: '#aaa', marginBottom: 4 }}>{label}</div>
          {body}
        </div>
      ))}
    </div>
  )
}

/* ── Bold: deep purple header + accent bars ── */
function BoldThumb() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', fontFamily: 'Arial, sans-serif', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: '#5b21b6', padding: '8px 9px 7px' }}>
        <div style={{ fontSize: 7.5, fontWeight: 800, color: '#fff', letterSpacing: 0.5 }}>{NAME}</div>
        <div style={{ fontSize: 4, color: '#ddd6fe', marginTop: 1.5 }}>{TITLE}</div>
        <div style={{ fontSize: 3.5, color: '#c4b5fd', marginTop: 2, display: 'flex', gap: 8 }}><span>{EMAIL}</span><span>{LOC}</span></div>
      </div>
      <div style={{ padding: '6px 9px', display: 'flex', flexDirection: 'column', gap: 5 }}>
        {[
          { title: 'SUMMARY', body: <div style={{ fontSize: 3.5, color: '#374151', lineHeight: 1.5 }}>{SUMMARY}</div> },
          { title: 'EXPERIENCE', body: EXP.map((e, i) => (
            <div key={i} style={{ marginBottom: 4 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 4, fontWeight: 700 }}>{e.role}</span>
                <span style={{ fontSize: 3.5, color: '#666' }}>{e.date}</span>
              </div>
              <div style={{ fontSize: 3.5, color: '#5b21b6', marginBottom: 1.5 }}>{e.company}</div>
              {e.bullets.slice(0, 2).map((b, j) => <div key={j} style={{ fontSize: 3.2, display: 'flex', gap: 2, color: '#374151', paddingLeft: 4 }}><span style={{ color: '#5b21b6' }}>▸</span><span>{b}</span></div>)}
            </div>
          ))},
          { title: 'SKILLS', body: (
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 2 }}>
              {SKILLS.map((s, i) => <span key={i} style={{ fontSize: 3.2, background: '#ede9fe', color: '#5b21b6', padding: '1px 4px', borderRadius: 2 }}>{s}</span>)}
            </div>
          )},
        ].map(({ title, body }) => (
          <div key={title}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginBottom: 2 }}>
              <div style={{ width: 3, height: 9, background: '#5b21b6', borderRadius: 1 }} />
              <div style={{ fontSize: 4.5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.8 }}>{title}</div>
            </div>
            <div style={{ borderBottom: '1px solid #ddd6fe', marginBottom: 3 }} />
            {body}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Sidebar: Max Johnson dark navy style ── */
function SidebarThumb() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', fontFamily: 'Arial, sans-serif', display: 'flex', flexDirection: 'row' }}>
      {/* Dark sidebar */}
      <div style={{ width: '34%', background: '#1e2936', padding: '8px 6px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 5 }}>
        {/* Avatar circle */}
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#4a9aba', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 3px' }}>
          <span style={{ fontSize: 9, fontWeight: 800, color: '#fff' }}>AJ</span>
        </div>
        {[
          { h: 'Contact', items: [{ label: 'Address', val: LOC }, { label: 'Phone', val: PHONE }, { label: 'Email', val: EMAIL }] },
          { h: 'Skills', items: SKILLS.slice(0, 5).map(s => ({ label: null, val: s })) },
        ].map(({ h, items }) => (
          <div key={h} style={{ width: '100%' }}>
            <div style={{ fontSize: 5.5, fontWeight: 800, color: '#fff', marginBottom: 2 }}>{h}</div>
            <div style={{ width: 14, height: 1.5, background: '#fff', marginBottom: 4 }} />
            {items.map((item, i) => (
              <div key={i} style={{ marginBottom: 3 }}>
                {item.label && <div style={{ fontSize: 3.2, fontWeight: 800, color: '#fff' }}>{item.label}</div>}
                {!item.label && <div style={{ fontSize: 3.2, color: '#b0c4d4', display: 'flex', gap: 2 }}><span>•</span><span>{item.val}</span></div>}
                {item.label && <div style={{ fontSize: 3.2, color: '#b0c4d4', lineHeight: 1.4 }}>{item.val}</div>}
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* Main */}
      <div style={{ flex: 1, padding: '10px 8px', display: 'flex', flexDirection: 'column', gap: 5 }}>
        <div>
          <div style={{ fontSize: 7.5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, color: '#1a1a1a' }}>{NAME}</div>
          <div style={{ fontSize: 4.5, color: '#555', marginTop: 1.5, marginBottom: 6 }}>{TITLE}</div>
        </div>
        {[
          { h: 'Profile', body: <div style={{ fontSize: 3.5, color: '#444', lineHeight: 1.55 }}>{SUMMARY}</div> },
          { h: 'Work Experience', body: EXP.map((e, i) => (
            <div key={i} style={{ marginBottom: 4 }}>
              <div style={{ fontSize: 4, fontWeight: 700 }}>{e.role}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 3.5, color: '#444' }}>{e.company}</span>
                <span style={{ fontSize: 3.2, color: '#777' }}>{e.date}</span>
              </div>
              {e.bullets.slice(0, 2).map((b, j) => <div key={j} style={{ fontSize: 3.2, display: 'flex', gap: 2, color: '#333' }}><span>•</span><span>{b}</span></div>)}
            </div>
          )) },
          { h: 'Education', body: (
            <div>
              <div style={{ fontSize: 4, fontWeight: 700 }}>{EDU.degree}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 3.5, color: '#555' }}>{EDU.school}</span>
                <span style={{ fontSize: 3.2, color: '#888' }}>{EDU.date}</span>
              </div>
            </div>
          )},
        ].map(({ h, body }) => (
          <div key={h}>
            <div style={{ fontSize: 5, fontWeight: 800, marginBottom: 2 }}>{h}</div>
            <div style={{ width: 14, height: 2, background: '#1a1a1a', marginBottom: 4 }} />
            {body}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Clean: amber accent, elegant centered header ── */
function CleanThumb() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', fontFamily: 'Georgia, serif', padding: '9px 10px', display: 'flex', flexDirection: 'column', gap: 5 }}>
      <div style={{ textAlign: 'center', borderBottom: '2px solid #b45309', paddingBottom: 5, marginBottom: 2 }}>
        <div style={{ fontSize: 7.5, fontWeight: 800, color: '#1c1917', letterSpacing: 0.5 }}>{NAME}</div>
        <div style={{ fontSize: 4.5, color: '#b45309', marginTop: 1.5 }}>{TITLE}</div>
        <div style={{ fontSize: 3.5, color: '#78716c', marginTop: 2, display: 'flex', justifyContent: 'center', gap: 8 }}><span>{EMAIL}</span><span>{PHONE}</span><span>{LOC}</span></div>
      </div>
      {[
        { h: 'PROFILE', body: <div style={{ fontSize: 3.5, color: '#57534e', lineHeight: 1.6 }}>{SUMMARY}</div> },
        { h: 'EXPERIENCE', body: EXP.map((e, i) => (
          <div key={i} style={{ marginBottom: 4 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 4, fontWeight: 700 }}>{e.role}</span>
              <span style={{ fontSize: 3.2, color: '#78716c' }}>{e.date}</span>
            </div>
            <div style={{ fontSize: 3.5, color: '#57534e', marginBottom: 1.5 }}>{e.company}</div>
            {e.bullets.slice(0, 2).map((b, j) => <div key={j} style={{ fontSize: 3.2, display: 'flex', gap: 2, color: '#44403c' }}><span style={{ color: '#b45309' }}>▪</span><span>{b}</span></div>)}
          </div>
        ))},
        { h: 'SKILLS', body: (
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 2 }}>
            {SKILLS.map((s, i) => <span key={i} style={{ fontSize: 3.2, border: '0.5px solid #e7d5bb', color: '#57534e', padding: '1px 4px', borderRadius: 8 }}>{s}</span>)}
          </div>
        )},
      ].map(({ h, body }) => (
        <div key={h}>
          <div style={{ fontSize: 4, fontWeight: 800, letterSpacing: 1.2, textTransform: 'uppercase', color: '#b45309', marginBottom: 2 }}>{h}</div>
          <div style={{ borderBottom: '0.5px solid #e7d5bb', marginBottom: 3 }} />
          {body}
        </div>
      ))}
    </div>
  )
}

const THUMBS: Record<TemplateId, React.FC> = {
  classic: ClassicThumb,
  modern:  ModernThumb,
  minimal: MinimalThumb,
  bold:    BoldThumb,
  sidebar: SidebarThumb,
  clean:   CleanThumb,
}

export default function TemplateThumbnail({ id }: { id: TemplateId }) {
  const Thumb = THUMBS[id]
  return <Thumb />
}
