export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      {/* Hero Section */}
      <section aria-label="G.O.A.T Alliance hero" className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="w-48 h-48 mx-auto mb-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-4xl font-bold">G.O.A.T.</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            G.O.A.T. ALLIANCE
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Network of Vetted Professionals - Connect with the Greatest Of All Time contractors and service providers.
          </p>
          <div className="space-x-4">
            <button 
              aria-label="Join the Alliance"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
            >
              Join the Alliance
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
              Explore Directory
            </button>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="text-xl font-bold">G.O.A.T. Alliance</div>
            <div className="hidden md:flex space-x-6">
              <a href="#directory" className="text-gray-700 hover:text-blue-600">Directory</a>
              <a href="/compliance" className="text-gray-700 hover:text-blue-600">Compliance</a>
            </div>
            <button 
              aria-label="Toggle mobile menu"
              className="md:hidden block text-gray-700"
            >
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* Contractor Directory */}
      <section id="directory" className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Contractors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((id) => (
            <div key={id} data-testid="contractor-card" className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Contractor {id}</h3>
              <div className="rating flex items-center mb-4">
                <span className="text-yellow-500">★★★★★</span>
                <span className="ml-2 text-gray-600">(5.0)</span>
              </div>
              <p className="text-gray-600 mb-4">Professional contractor with excellent track record.</p>
              <div className="flex space-x-2">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                  Call
                </button>
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                  Email
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}