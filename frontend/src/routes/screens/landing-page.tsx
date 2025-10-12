import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import HeroSection from "@/components/sections/hero-section"
import FeaturesSection from "@/components/sections/features-section"
import MembershipSection from "@/components/sections/membership-section"
import PartnersSection from "@/components/sections/partners-section"

export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-charcoal">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <MembershipSection />
        <PartnersSection />
      </main>
      <Footer />
    </div>
  )
}
