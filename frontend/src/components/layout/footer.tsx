export default function Footer() {
  return (
    <footer id="about" className="border-t border-white/10 bg-charcoal py-12">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-3">
        <div>
          <h3 className="font-display text-xl font-semibold text-saffron">GOAT Alliance</h3>
          <p className="mt-4 text-sm text-white/70">
            Connecting clients with the most trusted contractors, consultants, and specialists across the Pacific Northwest and
            beyond.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white/70">Contact</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>Email: hello@goatalliance.com</li>
            <li>Phone: (206) 555-GOAT</li>
            <li>Seattle, WA</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white/70">Stay in the Loop</h4>
          <p className="mt-4 text-sm text-white/70">
            Join our newsletter to receive vetted pro spotlights and exclusive offers.
          </p>
        </div>
      </div>
      <p className="mt-10 text-center text-xs text-white/50">© {new Date().getFullYear()} GOAT Alliance. All rights reserved.</p>
    </footer>
  )
}
