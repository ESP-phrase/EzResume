'use client'

import type { Resume, TemplateId } from '@/types/resume'

interface Props { resume: Resume; templateId: TemplateId }

const EMPTY = (
  <div className="text-center py-16 text-slate-300">
    <p className="text-sm">Your resume preview will appear here</p>
    <p className="text-xs mt-1 text-slate-400">Start filling in your details on the left</p>
  </div>
)

function isEmpty(r: Resume) {
  return !r.personalInfo.name && !r.personalInfo.email && r.experience.length === 0
}

/* ── Classic ── */
function Classic({ resume }: { resume: Resume }) {
  const { personalInfo: p, experience, education, skills } = resume
  return (
    <div className="bg-white text-slate-800 p-8 text-[11px] font-sans leading-snug min-h-full">
      <div className="border-b-2 border-slate-800 pb-3 mb-4">
        <h1 className="text-[22px] font-bold tracking-tight">{p.name || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-x-3 mt-0.5 text-slate-500">{[p.email, p.phone, p.location, p.linkedin].filter(Boolean).map((v, i) => <span key={i}>{v}</span>)}</div>
      </div>
      {p.summary && <Section title="Summary"><p className="text-slate-600 leading-relaxed">{p.summary}</p></Section>}
      {experience.length > 0 && <Section title="Experience">{experience.map(exp => <ExpEntry key={exp.id} exp={exp} accentClass="text-slate-800" />)}</Section>}
      {education.length > 0 && <Section title="Education">{education.map(edu => <EduEntry key={edu.id} edu={edu} />)}</Section>}
      {skills.length > 0 && <Section title="Skills"><div className="flex flex-wrap gap-1.5">{skills.map(s => <span key={s.id} className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[9px]">{s.name}</span>)}</div></Section>}
    </div>
  )
}

/* ── Modern ── */
function Modern({ resume }: { resume: Resume }) {
  const { personalInfo: p, experience, education, skills } = resume
  return (
    <div className="bg-white text-slate-800 text-[11px] font-sans leading-snug min-h-full">
      <div className="bg-blue-700 text-white px-8 py-6">
        <h1 className="text-[22px] font-bold tracking-tight">{p.name || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-x-4 mt-1 text-blue-200 text-[10px]">{[p.email, p.phone, p.location, p.linkedin].filter(Boolean).map((v, i) => <span key={i}>{v}</span>)}</div>
      </div>
      <div className="p-8">
        {p.summary && <ModSection title="Summary" accent="blue"><p className="text-slate-600 leading-relaxed">{p.summary}</p></ModSection>}
        {experience.length > 0 && <ModSection title="Experience" accent="blue">{experience.map(exp => <ExpEntry key={exp.id} exp={exp} accentClass="text-blue-700" />)}</ModSection>}
        {education.length > 0 && <ModSection title="Education" accent="blue">{education.map(edu => <EduEntry key={edu.id} edu={edu} />)}</ModSection>}
        {skills.length > 0 && <ModSection title="Skills" accent="blue"><div className="flex flex-wrap gap-1.5">{skills.map(s => <span key={s.id} className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[9px]">{s.name}</span>)}</div></ModSection>}
      </div>
    </div>
  )
}

/* ── Minimal ── */
function Minimal({ resume }: { resume: Resume }) {
  const { personalInfo: p, experience, education, skills } = resume
  return (
    <div className="bg-white text-slate-700 p-10 text-[11px] font-sans leading-relaxed min-h-full">
      <div className="mb-6">
        <h1 className="text-[20px] font-light tracking-[0.1em] text-slate-500 uppercase">{p.name || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-x-4 mt-1 text-slate-400 text-[10px]">{[p.email, p.phone, p.location].filter(Boolean).map((v, i) => <span key={i}>{v}</span>)}</div>
      </div>
      {p.summary && <MinSection title="Profile"><p className="text-slate-500">{p.summary}</p></MinSection>}
      {experience.length > 0 && <MinSection title="Experience">{experience.map(exp => <ExpEntry key={exp.id} exp={exp} accentClass="text-slate-500" />)}</MinSection>}
      {education.length > 0 && <MinSection title="Education">{education.map(edu => <EduEntry key={edu.id} edu={edu} />)}</MinSection>}
      {skills.length > 0 && <MinSection title="Skills"><div className="flex flex-wrap gap-x-3 gap-y-0.5 text-slate-400">{skills.map(s => <span key={s.id}>{s.name}</span>)}</div></MinSection>}
    </div>
  )
}

/* ── Bold ── */
function Bold({ resume }: { resume: Resume }) {
  const { personalInfo: p, experience, education, skills } = resume
  return (
    <div className="bg-white text-slate-800 text-[11px] font-sans leading-snug min-h-full">
      <div className="bg-violet-700 text-white px-8 py-7">
        <h1 className="text-[28px] font-black tracking-tight uppercase">{p.name || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-x-4 mt-2 text-violet-200 text-[10px]">{[p.email, p.phone, p.location].filter(Boolean).map((v, i) => <span key={i}>{v}</span>)}</div>
      </div>
      <div className="p-8">
        {p.summary && <BoldSection title="Summary"><p className="text-slate-600 leading-relaxed">{p.summary}</p></BoldSection>}
        {experience.length > 0 && <BoldSection title="Experience">{experience.map(exp => <ExpEntry key={exp.id} exp={exp} accentClass="text-violet-700" />)}</BoldSection>}
        {education.length > 0 && <BoldSection title="Education">{education.map(edu => <EduEntry key={edu.id} edu={edu} />)}</BoldSection>}
        {skills.length > 0 && <BoldSection title="Skills"><div className="flex flex-wrap gap-1.5">{skills.map(s => <span key={s.id} className="bg-violet-50 text-violet-700 px-2 py-0.5 rounded text-[9px] border border-violet-200">{s.name}</span>)}</div></BoldSection>}
      </div>
    </div>
  )
}

/* ── Sidebar ── */
function Sidebar({ resume }: { resume: Resume }) {
  const { personalInfo: p, experience, education, skills } = resume
  return (
    <div className="bg-white text-slate-800 text-[11px] font-sans leading-snug min-h-full flex">
      <div className="w-2/5 bg-teal-800 text-white p-5 flex flex-col gap-4">
        <div>
          <div className="w-14 h-14 rounded-full bg-teal-500 flex items-center justify-center text-xl font-bold mb-3">
            {p.name?.[0] || '?'}
          </div>
          <h1 className="text-[16px] font-bold leading-tight">{p.name || 'Your Name'}</h1>
        </div>
        <div className="flex flex-col gap-1 text-teal-200 text-[10px]">
          {[p.email, p.phone, p.location, p.linkedin].filter(Boolean).map((v, i) => <span key={i} className="break-all">{v}</span>)}
        </div>
        {skills.length > 0 && (
          <div>
            <div className="text-[9px] font-bold uppercase tracking-widest text-teal-300 mb-2">Skills</div>
            <div className="flex flex-col gap-1">{skills.map(s => <span key={s.id} className="text-teal-100 text-[10px]">• {s.name}</span>)}</div>
          </div>
        )}
        {education.length > 0 && (
          <div>
            <div className="text-[9px] font-bold uppercase tracking-widest text-teal-300 mb-2">Education</div>
            {education.map(edu => (
              <div key={edu.id} className="mb-2">
                <div className="font-semibold text-white">{edu.school}</div>
                <div className="text-teal-200">{edu.degree}{edu.field ? `, ${edu.field}` : ''}</div>
                <div className="text-teal-300 text-[9px]">{edu.graduationDate}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex-1 p-5">
        {p.summary && <div className="mb-4"><div className="text-[9px] font-bold uppercase tracking-widest text-teal-800 mb-1 border-b border-teal-200 pb-1">Profile</div><p className="text-slate-600 leading-relaxed">{p.summary}</p></div>}
        {experience.length > 0 && (
          <div>
            <div className="text-[9px] font-bold uppercase tracking-widest text-teal-800 mb-2 border-b border-teal-200 pb-1">Experience</div>
            {experience.map(exp => <ExpEntry key={exp.id} exp={exp} accentClass="text-teal-800" />)}
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Clean ── */
function Clean({ resume }: { resume: Resume }) {
  const { personalInfo: p, experience, education, skills } = resume
  return (
    <div className="bg-white text-slate-800 p-8 text-[11px] font-sans leading-snug min-h-full">
      <div className="text-center mb-5 pb-4 border-b-2 border-amber-700">
        <h1 className="text-[22px] font-bold tracking-tight">{p.name || 'Your Name'}</h1>
        <div className="flex flex-wrap justify-center gap-x-3 mt-1 text-slate-500 text-[10px]">{[p.email, p.phone, p.location, p.linkedin].filter(Boolean).map((v, i) => <span key={i}>{v}</span>)}</div>
      </div>
      {p.summary && <CleanSection title="Summary"><p className="text-slate-600 leading-relaxed">{p.summary}</p></CleanSection>}
      {experience.length > 0 && <CleanSection title="Experience">{experience.map(exp => <ExpEntry key={exp.id} exp={exp} accentClass="text-amber-700" />)}</CleanSection>}
      {education.length > 0 && <CleanSection title="Education">{education.map(edu => <EduEntry key={edu.id} edu={edu} />)}</CleanSection>}
      {skills.length > 0 && <CleanSection title="Skills"><div className="flex flex-wrap gap-1.5">{skills.map(s => <span key={s.id} className="bg-amber-50 text-amber-800 px-2 py-0.5 rounded text-[9px] border border-amber-200">{s.name}</span>)}</div></CleanSection>}
    </div>
  )
}

/* ── Shared sub-components ── */
function ExpEntry({ exp, accentClass }: { exp: Resume['experience'][0]; accentClass: string }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between items-baseline">
        <div><span className={`font-bold ${accentClass}`}>{exp.title || 'Job Title'}</span>{exp.company && <span className="text-slate-500"> · {exp.company}</span>}</div>
        <span className="text-slate-400 text-[9px] whitespace-nowrap ml-2">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
      </div>
      <ul className="mt-0.5 space-y-0.5">{exp.bullets.filter(Boolean).map((b, i) => <li key={i} className="flex gap-1.5 text-slate-600"><span className="mt-px flex-shrink-0">•</span><span>{b}</span></li>)}</ul>
    </div>
  )
}

function EduEntry({ edu }: { edu: Resume['education'][0] }) {
  return (
    <div className="mb-2 flex justify-between items-baseline">
      <div><span className="font-bold text-slate-800">{edu.school}</span>{(edu.degree || edu.field) && <div className="text-slate-500">{edu.degree}{edu.field ? `, ${edu.field}` : ''}</div>}</div>
      <span className="text-slate-400 text-[9px] whitespace-nowrap ml-2">{edu.graduationDate}</span>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="mb-4"><div className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-1.5 border-b border-slate-200 pb-0.5">{title}</div>{children}</div>
}
function ModSection({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return <div className="mb-4"><div className={`text-[9px] font-bold uppercase tracking-[0.15em] text-${accent}-700 mb-1.5 border-b border-${accent}-200 pb-0.5`}>{title}</div>{children}</div>
}
function MinSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="mb-5"><div className="text-[9px] uppercase tracking-[0.2em] text-slate-300 mb-2">{title}</div>{children}</div>
}
function BoldSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="mb-4"><div className="flex items-center gap-2 mb-2"><div className="w-2 h-2 rounded-full bg-violet-700" /><span className="text-[10px] font-black uppercase tracking-widest text-slate-700">{title}</span></div>{children}</div>
}
function CleanSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="mb-4"><div className="text-[9px] font-bold uppercase tracking-[0.15em] text-amber-700 mb-1.5 border-b border-amber-200 pb-0.5">{title}</div>{children}</div>
}

const TEMPLATES: Record<TemplateId, React.FC<{ resume: Resume }>> = {
  classic: Classic, modern: Modern, minimal: Minimal,
  bold: Bold, sidebar: Sidebar, clean: Clean,
}

export default function ResumePreview({ resume, templateId }: Props) {
  if (isEmpty(resume)) {
    return (
      <div className="bg-white rounded-xl shadow-2xl p-8 min-h-[400px] flex items-center justify-center">
        {EMPTY}
      </div>
    )
  }
  const Template = TEMPLATES[templateId] ?? Classic
  return (
    <div className="rounded-xl shadow-2xl overflow-hidden">
      <Template resume={resume} />
    </div>
  )
}
