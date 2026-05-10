import Link from 'next/link'

// Diamond spark mark — represents sharpening, polish, AI magic
function LogoMark({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer glow ring */}
      <circle cx="16" cy="16" r="15" fill="#F59E0B" fillOpacity="0.12" />
      {/* Diamond / spark shape */}
      <path
        d="M16 4 L19.5 13.5 L29 16 L19.5 18.5 L16 28 L12.5 18.5 L3 16 L12.5 13.5 Z"
        fill="#F59E0B"
      />
      {/* Inner highlight */}
      <path
        d="M16 8 L18.2 14.8 L24 16 L18.2 17.2 L16 24 L13.8 17.2 L8 16 L13.8 14.8 Z"
        fill="#FDE68A"
        fillOpacity="0.5"
      />
    </svg>
  )
}

const NAME = 'Hone'

export function Logo({ href = '/', size = 'md' }: { href?: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: { mark: 16, text: 'text-sm' },
    md: { mark: 20, text: 'text-base' },
    lg: { mark: 26, text: 'text-xl' },
  }
  return (
    <Link href={href} className="flex items-center gap-2">
      <LogoMark size={sizes[size].mark} />
      <span className={`font-bold tracking-tight ${sizes[size].text}`}>
        <span className="text-stone-100">{NAME}</span>
      </span>
    </Link>
  )
}

export function LogoMarkOnly({ size = 20 }: { size?: number }) {
  return <LogoMark size={size} />
}
