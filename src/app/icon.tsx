import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0C0A09',
          borderRadius: 6,
        }}
      >
        <svg viewBox="0 0 22 26" width="22" height="26" fill="none">
          <path d="M0 0h16l6 6v20H0V0z" fill="#292524" stroke="#57534E" strokeWidth="1" strokeLinejoin="round" />
          <path d="M16 0l6 6h-6V0z" fill="#F59E0B" />
          <line x1="3.5" y1="11" x2="18.5" y2="11" stroke="#78716C" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="3.5" y1="15" x2="18.5" y2="15" stroke="#78716C" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="3.5" y1="19" x2="12" y2="19" stroke="#78716C" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    ),
    { ...size }
  )
}
