import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? 'https://resumegenius.app'
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/dashboard', '/builder', '/api/'] },
    ],
    sitemap: `${base}/sitemap.xml`,
  }
}
