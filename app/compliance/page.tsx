export default function Compliance() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">Compliance & Ethics</h1>
        <div className="max-w-4xl mx-auto">
          <section className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Standards</h2>
            <p className="text-gray-700 mb-4">
              The G.O.A.T. Alliance maintains the highest standards of professional conduct and compliance.
              All members of our network are thoroughly vetted and must adhere to our strict ethical guidelines.
            </p>
          </section>
          
          <section className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold mb-4">Verification Process</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Background checks and license verification</li>
              <li>Insurance and bonding requirements</li>
              <li>Client reference validation</li>
              <li>Ongoing performance monitoring</li>
            </ul>
          </section>

          <section className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Contact Compliance</h2>
            <p className="text-gray-700 mb-4">
              Have questions about our compliance standards or need to report an issue?
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">
              Contact Us
            </button>
          </section>
        </div>
      </div>
    </main>
  )
}