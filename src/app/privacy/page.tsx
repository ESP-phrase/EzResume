import Link from 'next/link'
import { Logo } from '@/components/Logo'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for ResumeGenius',
}

export default function PrivacyPage() {
  const updated = 'May 10, 2026'
  return (
    <div className="min-h-screen bg-stone-950 flex flex-col">
      <nav className="px-6 py-5 border-b border-stone-800/60">
        <Logo size="md" />
      </nav>

      <main className="flex-1 max-w-3xl mx-auto px-6 py-16 w-full">
        <div className="mb-10">
          <h1 className="text-4xl text-stone-100 mb-3" style={{ fontFamily: 'var(--font-serif)' }}>Privacy Policy</h1>
          <p className="text-stone-500 text-sm">Last updated: {updated}</p>
        </div>

        <div className="space-y-8 text-stone-400 text-sm leading-relaxed">

          <section className="space-y-3">
            <h2 className="text-stone-200 text-lg font-semibold">1. What We Collect</h2>
            <p>We collect the following information when you use ResumeGenius:</p>
            <ul className="list-disc list-inside space-y-1.5 ml-2">
              <li><strong className="text-stone-300">Email address</strong> — to create your account and send sign-in links</li>
              <li><strong className="text-stone-300">Resume content</strong> — the text you enter into the builder (job titles, bullet points, education, skills)</li>
              <li><strong className="text-stone-300">Payment information</strong> — processed and stored by Stripe. We never see or store your full card number</li>
              <li><strong className="text-stone-300">Usage data</strong> — pages visited, features used, via PostHog analytics</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-stone-200 text-lg font-semibold">2. How We Use Your Data</h2>
            <ul className="list-disc list-inside space-y-1.5 ml-2">
              <li>To provide and improve the resume building service</li>
              <li>To send you sign-in links and account-related emails</li>
              <li>To process payments via Stripe</li>
              <li>To improve our AI models and product features (aggregated and anonymized)</li>
            </ul>
            <p>We do not sell your personal data to third parties.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-stone-200 text-lg font-semibold">3. AI Processing</h2>
            <p>When you use the AI rewrite feature, your resume bullet points are sent to OpenAI's API for processing. OpenAI's privacy policy applies to this processing. We do not use your data to train AI models without your consent.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-stone-200 text-lg font-semibold">4. Data Storage</h2>
            <p>Your resume data is stored in a secure PostgreSQL database hosted on Neon. Resume previews are also stored in your browser's local storage for performance. We retain your data as long as your account is active.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-stone-200 text-lg font-semibold">5. Third-Party Services</h2>
            <p>We use the following third-party services:</p>
            <ul className="list-disc list-inside space-y-1.5 ml-2">
              <li><strong className="text-stone-300">Stripe</strong> — payment processing</li>
              <li><strong className="text-stone-300">Resend</strong> — transactional email delivery</li>
              <li><strong className="text-stone-300">OpenAI</strong> — AI bullet rewriting</li>
              <li><strong className="text-stone-300">PostHog</strong> — product analytics</li>
              <li><strong className="text-stone-300">Reddit Pixel</strong> — advertising measurement</li>
            </ul>
            <p>Each of these services has their own privacy policy governing their data use.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-stone-200 text-lg font-semibold">6. Cookies</h2>
            <p>We use cookies to keep you signed in and to measure site analytics. We do not use advertising cookies beyond the Reddit Pixel used to measure ad campaign performance.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-stone-200 text-lg font-semibold">7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-1.5 ml-2">
              <li>Access the personal data we hold about you</li>
              <li>Request deletion of your account and all associated data</li>
              <li>Export your resume data at any time</li>
              <li>Opt out of analytics tracking</li>
            </ul>
            <p>To exercise any of these rights, email us at <a href="mailto:support@resumegenius.guru" className="text-amber-500 hover:text-amber-400">support@resumegenius.guru</a>.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-stone-200 text-lg font-semibold">8. Data Retention</h2>
            <p>We retain your data for as long as your account is active. If you delete your account, we will delete your personal data within 30 days, except where retention is required by law.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-stone-200 text-lg font-semibold">9. Children's Privacy</h2>
            <p>ResumeGenius is not directed at children under 13. We do not knowingly collect personal information from children under 13.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-stone-200 text-lg font-semibold">10. Changes to This Policy</h2>
            <p>We may update this policy from time to time. We will notify you of significant changes by email or by posting a notice on the site.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-stone-200 text-lg font-semibold">11. Contact</h2>
            <p>Questions about privacy? Email us at <a href="mailto:support@resumegenius.guru" className="text-amber-500 hover:text-amber-400">support@resumegenius.guru</a>.</p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-stone-800 flex gap-6 text-sm">
          <Link href="/terms" className="text-stone-500 hover:text-stone-300 transition-colors">Terms of Service</Link>
          <Link href="/" className="text-stone-500 hover:text-stone-300 transition-colors">← Back to home</Link>
        </div>
      </main>
    </div>
  )
}
