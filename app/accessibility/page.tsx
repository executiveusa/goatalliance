import Link from "next/link"

const LAST_REVIEWED = "March 2025"

export default function AccessibilityPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-24 space-y-8">
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Accessibility Commitment</h1>
      <p className="text-lg text-slate-600 dark:text-slate-200">
        G.O.A.T. Alliance is committed to providing an inclusive experience for every visitor. We routinely audit our digital
        products against WCAG 2.2 AA success criteria and engage assistive technology users in usability testing.
      </p>
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Key Practices</h2>
        <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-200">
          <li>Quarterly accessibility reviews including automated, manual, and assistive-technology testing.</li>
          <li>Semantic HTML structure with focus management, skip-navigation, and high-contrast design tokens.</li>
          <li>Inclusive content strategy that supports screen readers, voice control, and keyboard-only navigation.</li>
        </ul>
      </section>
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Need Assistance?</h2>
        <p className="text-slate-600 dark:text-slate-200">
          If you encounter an accessibility barrier, please email
          <a href="mailto:accessibility@goatalliance.com" className="text-emerald-500 hover:text-emerald-400 ml-1">
            accessibility@goatalliance.com
          </a>
          or call our concierge team at
          <a href="tel:+18335554628" className="text-emerald-500 hover:text-emerald-400 ml-1">
            +1 (833) 555-4628
          </a>
          . We aim to respond within two business days.
        </p>
      </section>
      <p className="text-sm text-slate-500 dark:text-slate-300">Last reviewed: {LAST_REVIEWED}</p>
      <Link href="/" className="text-emerald-500 hover:text-emerald-400 font-semibold">
        Return to homepage
      </Link>
    </main>
  )
}
