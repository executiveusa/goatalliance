import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { LandingPage } from "./landing-page"

vi.mock("@/components/layout/header", () => ({
  __esModule: true,
  default: () => <header>Header</header>
}))

vi.mock("@/components/layout/footer", () => ({
  __esModule: true,
  default: () => <footer>Footer</footer>
}))

vi.mock("@/components/sections/hero-section", () => ({
  __esModule: true,
  default: () => <section>Hero</section>
}))

vi.mock("@/components/sections/features-section", () => ({
  __esModule: true,
  default: () => <section>Features</section>
}))

vi.mock("@/components/sections/membership-section", () => ({
  __esModule: true,
  default: () => <section>Membership</section>
}))

vi.mock("@/components/sections/partners-section", () => ({
  __esModule: true,
  default: () => <section>Partners</section>
}))

describe("LandingPage", () => {
  it("renders the hero section", () => {
    render(<LandingPage />)
    expect(screen.getByText(/hero/i)).toBeInTheDocument()
  })
})
