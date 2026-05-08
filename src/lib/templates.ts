import type { TemplateId } from '@/types/resume'

export interface Template {
  id: TemplateId
  name: string
  description: string
  accent: string
}

export const TEMPLATES: Template[] = [
  { id: 'classic',  name: 'Classic',  description: 'Clean & traditional. Works everywhere.',     accent: '#1e293b' },
  { id: 'modern',   name: 'Modern',   description: 'Bold navy header, sharp sections.',          accent: '#1d4ed8' },
  { id: 'minimal',  name: 'Minimal',  description: 'Ultra clean, maximum white space.',          accent: '#64748b' },
  { id: 'bold',     name: 'Bold',     description: 'Strong typography, makes a statement.',      accent: '#7c3aed' },
  { id: 'sidebar',  name: 'Sidebar',  description: 'Two-column with colored sidebar.',           accent: '#0f766e' },
  { id: 'clean',    name: 'Clean',    description: 'Centered header, elegant layout.',           accent: '#b45309' },
]
