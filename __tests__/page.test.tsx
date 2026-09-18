import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('Home', () => {
  it('renders the directory hero heading', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      name: /ai-readable contractor directory/i,
    })

    expect(heading).toBeInTheDocument()
  })

  it('links to the directory', () => {
    render(<Home />)

    const links = screen.getAllByRole('link', { name: /directory/i })
    expect(links.length).toBeGreaterThan(0)
  })

  it('links to the field guide blog', () => {
    render(<Home />)

    const blogLink = screen.getByRole('link', { name: /field guide/i })
    expect(blogLink).toBeInTheDocument()
  })
})
