/* Reddit Pixel helper — typed wrapper around window.rdt */
declare global {
  interface Window {
    rdt?: (event: string, name: string, data?: Record<string, unknown>) => void
  }
}

export function rdtTrack(event: string, data?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && typeof window.rdt === 'function') {
    window.rdt('track', event, data)
  }
}
