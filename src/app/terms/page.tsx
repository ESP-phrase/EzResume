import Link from 'next/link'
import { Logo } from '@/components/Logo'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for ResumeGenius',
}

export default function TermsPage() {
  const updated = 'May 10, 2026'
  return (
    <div className="min-h-screen bg-stone-950 flex flex-col">
      <nav className="px-6 py-5 border-b border-stone-800/60">
        <Logo size="md" />
      </nav>

      <main className="flex-1 max-w-3xl mx-auto px-6 py-16 w-full">
        <div className="mb-10">
          <h1 className="text-4xl text-stone-100 mb-3" style={{ fontFamily: 'var(--font-serif)' }}>Terms of Service</h1>
          <p className="text-stone-500 text-sm">Last updated: {updated}</p>
        </div>

        <div className="prose prose-invert prose-stone max-w-none space-y-8 text-stone-400 text-sm leading-relaxed">

          <section className="space-y-3">
            <h2 className="text-stone-200 text-lg font-semibold">1. Acceptance of Terms</h2>
            <p>By accessing or using ResumeGenius ("we," "us," or "our") at resumegenius.guru, you agree to be bound by these Terms of Service. If you do not agree, do not use the service.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-stone-200 text-lg font-semibold">2. Description of Service</h2>
            <p>ResumeGenius is an AI-powered resume builder that helps users create, edit, and download professional resumes. The service is free to build and requires payment to download the final PDF.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-stone-200 text-lg font-semibold">3. Accounts</h2>
            <p>You may sign in using a magic link sent to your email address. You are responsible for maintaining the security of your account. You must provide accurate information and promptly update it if it changes.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-stone-200 text-lg font-semibold">4. Payments and Refunds</h2>
            <p>We offer a one-time payment plan and a monthly subscription plan. All payments are processed securely by Stripe. We offer a 7-day money-back guarantee — if you are not satisfied, contact us within 7 days of purchase for a full refund, no questions asked.</p>
            <p>Subscriptions automatically renew each month until cancelled. You may cancel at any time from your account settings, effective at the end of the current billing period.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-stone-200 text-lg font-semibold">5. User Content</h2>
            <p>You retain ownership of all content you submit to the service, including your resume data. By submitting content, you grant us a limited license to process and store it for the purpose of providing the service. We do not sell your data to third parties.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-stone-200 text-lg font-semibold">6. AI-Generated Content</h2>
            <p>ResumeGenius uses artificial intelligence to suggest and rewrite resume content. AI-generated suggestions are provided as a starting point — you are responsible for reviewing, editing, and verifying all content before use. We make no guarantees about the accuracy or suitability of AI-generated content for any specific job application.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-stone-200 text-lg font-semibold">7. Prohibited Use</h2>
            <p>You may not use ResumeGenius to: create false or misleading content, violate any applicable laws, attempt to reverse-engineer or copy our service, or abuse our AI infrastructure through automated or excessive requests.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-stone-200 text-lg font-semibold">8. Disclaimer of Warranties</h2>
            <p>The service is provided "as is" without warranties of any kind. We do not guarantee that use of our service will result in job interviews, employment offers, or any specific career outcome.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-stone-200 text-lg font-semibold">9. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, ResumeGenius shall not be liable for any indirect, incidental, or consequential damages arising from your use of the service. Our total liability shall not exceed the amount you paid us in the 12 months prior to the claim.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-stone-200 text-lg font-semibold">10. Changes to Terms</h2>
            <p>We may update these terms from time to time. Continued use of the service after changes constitutes acceptance of the new terms. We will notify you of significant changes by email.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-stone-200 text-lg font-semibold">11. Contact</h2>
            <p>Questions about these terms? Email us at <a href="mailto:support@resumegenius.guru" className="text-amber-500 hover:text-amber-400">support@resumegenius.guru</a>.</p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-stone-800 flex gap-6 text-sm">
          <Link href="/privacy" className="text-stone-500 hover:text-stone-300 transition-colors">Privacy Policy</Link>
          <Link href="/" className="text-stone-500 hover:text-stone-300 transition-colors">← Back to home</Link>
        </div>
      </main>
    </div>
  )
}
