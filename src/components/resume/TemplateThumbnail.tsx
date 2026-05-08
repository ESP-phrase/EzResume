import type { TemplateId } from '@/types/resume'

function ClassicThumb() {
  return (
    <div className="w-full h-full bg-white p-2 flex flex-col gap-1">
      <div className="h-3 w-3/4 bg-slate-800 rounded-sm" />
      <div className="h-1.5 w-1/2 bg-slate-300 rounded-sm" />
      <div className="border-b border-slate-800 mt-1 mb-1" />
      <div className="h-1.5 w-1/3 bg-slate-600 rounded-sm mb-0.5" />
      {[0.9, 0.7, 0.8].map((w, i) => <div key={i} style={{ width: `${w * 100}%` }} className="h-1 bg-slate-200 rounded-sm" />)}
      <div className="h-1.5 w-1/3 bg-slate-600 rounded-sm mt-1 mb-0.5" />
      {[0.85, 0.6].map((w, i) => <div key={i} style={{ width: `${w * 100}%` }} className="h-1 bg-slate-200 rounded-sm" />)}
    </div>
  )
}

function ModernThumb() {
  return (
    <div className="w-full h-full bg-white flex flex-col">
      <div className="bg-blue-700 px-2 py-2 flex flex-col gap-1">
        <div className="h-2.5 w-2/3 bg-white/80 rounded-sm" />
        <div className="h-1 w-1/2 bg-blue-300 rounded-sm" />
      </div>
      <div className="p-2 flex flex-col gap-1 flex-1">
        <div className="h-1.5 w-1/3 bg-blue-700 rounded-sm mb-0.5" />
        {[0.9, 0.7, 0.8].map((w, i) => <div key={i} style={{ width: `${w * 100}%` }} className="h-1 bg-slate-200 rounded-sm" />)}
        <div className="h-1.5 w-1/3 bg-blue-700 rounded-sm mt-1 mb-0.5" />
        {[0.85, 0.65].map((w, i) => <div key={i} style={{ width: `${w * 100}%` }} className="h-1 bg-slate-200 rounded-sm" />)}
      </div>
    </div>
  )
}

function MinimalThumb() {
  return (
    <div className="w-full h-full bg-white p-2.5 flex flex-col gap-1.5">
      <div className="h-2.5 w-3/5 bg-slate-400 rounded-sm" />
      <div className="h-1 w-2/5 bg-slate-200 rounded-sm" />
      <div className="mt-1.5 flex flex-col gap-1">
        <div className="h-1 w-1/4 bg-slate-300 rounded-sm" />
        {[0.95, 0.75, 0.85].map((w, i) => <div key={i} style={{ width: `${w * 100}%` }} className="h-0.5 bg-slate-100 rounded-sm" />)}
      </div>
      <div className="flex flex-col gap-1 mt-1">
        <div className="h-1 w-1/4 bg-slate-300 rounded-sm" />
        {[0.9, 0.7].map((w, i) => <div key={i} style={{ width: `${w * 100}%` }} className="h-0.5 bg-slate-100 rounded-sm" />)}
      </div>
    </div>
  )
}

function BoldThumb() {
  return (
    <div className="w-full h-full bg-white flex flex-col">
      <div className="bg-violet-700 px-2 py-2.5">
        <div className="h-3.5 w-3/4 bg-white rounded-sm" />
        <div className="h-1 w-1/2 bg-violet-300 rounded-sm mt-1" />
      </div>
      <div className="p-2 flex flex-col gap-1">
        <div className="flex items-center gap-1 mt-0.5">
          <div className="w-1 h-1 rounded-full bg-violet-700" />
          <div className="h-1.5 w-1/3 bg-slate-700 rounded-sm" />
        </div>
        {[0.9, 0.7, 0.8].map((w, i) => <div key={i} style={{ width: `${w * 100}%` }} className="h-1 bg-slate-200 rounded-sm" />)}
        <div className="flex items-center gap-1 mt-1">
          <div className="w-1 h-1 rounded-full bg-violet-700" />
          <div className="h-1.5 w-1/3 bg-slate-700 rounded-sm" />
        </div>
        {[0.85, 0.65].map((w, i) => <div key={i} style={{ width: `${w * 100}%` }} className="h-1 bg-slate-200 rounded-sm" />)}
      </div>
    </div>
  )
}

function SidebarThumb() {
  return (
    <div className="w-full h-full bg-white flex flex-row">
      <div className="w-2/5 bg-teal-700 p-1.5 flex flex-col gap-1">
        <div className="w-7 h-7 rounded-full bg-teal-400 mx-auto mb-1" />
        <div className="h-1 w-full bg-teal-400 rounded-sm" />
        <div className="h-1 w-3/4 bg-teal-500 rounded-sm" />
        <div className="border-t border-teal-500 my-1" />
        {[0.9, 0.7, 0.8, 0.6].map((w, i) => <div key={i} style={{ width: `${w * 100}%` }} className="h-0.5 bg-teal-400 rounded-sm" />)}
      </div>
      <div className="flex-1 p-1.5 flex flex-col gap-1">
        <div className="h-1.5 w-3/4 bg-slate-700 rounded-sm" />
        <div className="border-b border-slate-200 mb-0.5" />
        {[0.9, 0.7, 0.85].map((w, i) => <div key={i} style={{ width: `${w * 100}%` }} className="h-0.5 bg-slate-200 rounded-sm" />)}
        <div className="h-1.5 w-3/4 bg-slate-700 rounded-sm mt-1" />
        <div className="border-b border-slate-200 mb-0.5" />
        {[0.8, 0.65].map((w, i) => <div key={i} style={{ width: `${w * 100}%` }} className="h-0.5 bg-slate-200 rounded-sm" />)}
      </div>
    </div>
  )
}

function CleanThumb() {
  return (
    <div className="w-full h-full bg-white p-2 flex flex-col gap-1 items-center">
      <div className="h-3 w-2/3 bg-amber-700 rounded-sm" />
      <div className="h-1 w-1/2 bg-slate-300 rounded-sm" />
      <div className="w-full border-b-2 border-amber-700 mt-1 mb-1.5" />
      <div className="w-full flex flex-col gap-1">
        <div className="h-1.5 w-1/3 bg-amber-700 rounded-sm" />
        {[0.95, 0.75, 0.85].map((w, i) => <div key={i} style={{ width: `${w * 100}%` }} className="h-1 bg-slate-200 rounded-sm" />)}
        <div className="h-1.5 w-1/3 bg-amber-700 rounded-sm mt-1" />
        {[0.9, 0.7].map((w, i) => <div key={i} style={{ width: `${w * 100}%` }} className="h-1 bg-slate-200 rounded-sm" />)}
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
