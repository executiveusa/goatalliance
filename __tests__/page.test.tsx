import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('Home', () => {
  it('renders the G.O.A.T. Alliance heading', () => {
    render(<Home />)
    
    const heading = screen.getByRole('heading', {
      name: /g\.o\.a\.t\. alliance/i,
    })

    expect(heading).toBeInTheDocument()
  })

  it('renders the contractor cards', () => {
    render(<Home />)
    
    const contractorCards = screen.getAllByTestId('contractor-card')
    expect(contractorCards).toHaveLength(6)
  })

  it('renders the navigation links', () => {
    render(<Home />)
    
    const directoryLink = screen.getByRole('link', { name: /directory/i })
    const complianceLink = screen.getByRole('link', { name: /compliance/i })

    expect(directoryLink).toBeInTheDocument()
    expect(complianceLink).toBeInTheDocument()
  })
})