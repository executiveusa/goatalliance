export default function Home() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>🐐 GOAT Alliance</h1>
      <h2>Network of Vetted Professionals</h2>
      <p>Welcome to the GOAT Alliance - connecting top-tier professionals in a trusted network.</p>
      
      <div style={{ marginTop: '2rem' }}>
        <h3>Features</h3>
        <ul>
          <li>Vetted professional network</li>
          <li>Secure connections</li>
          <li>Verified expertise</li>
          <li>Collaborative opportunities</li>
        </ul>
      </div>
      
      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f0f8ff', borderRadius: '8px' }}>
        <p><strong>Status:</strong> Frontend deployed on Vercel ✅</p>
        <p><strong>Backend:</strong> Powered by Encore.ts</p>
      </div>
    </main>
  )
}