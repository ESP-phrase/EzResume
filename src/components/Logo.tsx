import Link from 'next/link'

function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 22 26" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M0 0h16l6 6v20H0V0z" fill="#292524" stroke="#57534E" strokeWidth="1" strokeLinejoin="round"/>
      <path d="M16 0l6 6h-6V0z" fill="#F59E0B"/>
      <line x1="3.5" y1="11" x2="18.5" y2="11" stroke="#78716C" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="3.5" y1="15" x2="18.5" y2="15" stroke="#78716C" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="3.5" y1="19" x2="12" y2="19" stroke="#78716C" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

export function Logo({ href = '/', size = 'md' }: { href?: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: { mark: 'w-4 h-5', text: 'text-sm' },
    md: { mark: 'w-5 h-6', text: 'text-base' },
    lg: { mark: 'w-6 h-7', text: 'text-lg' },
  }
  return (
    <Link href={href} className="flex items-center gap-2.5">
      <LogoMark className={sizes[size].mark} />
      <span className={`font-bold text-stone-100 tracking-tight ${sizes[size].text}`} style={{ fontFamily: 'var(--font-serif)' }}>
        ResumeGenius
      </span>
    </Link>
  )
}

export function LogoMarkOnly({ className }: { className?: string }) {
  return <LogoMark className={className} />
}
