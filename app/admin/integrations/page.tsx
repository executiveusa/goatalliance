'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface TestResult {
  success: boolean
  message: string
  shops?: any[]
  data?: any
  timestamp: string
  error?: string
}

export default function PrintifyIntegrationsPage() {
  const [testResults, setTestResults] = useState<TestResult | null>(null)
  const [productsData, setProductsData] = useState<TestResult | null>(null)
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/printify/test')
      const result = await response.json()
      setTestResults(result)
    } catch (error) {
      setTestResults({
        success: false,
        message: 'Failed to test connection',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/printify/products')
      const result = await response.json()
      setProductsData(result)
    } catch (error) {
      setProductsData({
        success: false,
        message: 'Failed to fetch products',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold mb-8">Printify Integration Test</h1>
          
          <div className="space-y-6">
            {/* Connection Test */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Connection Test</h2>
              <p className="text-gray-600 mb-4">
                Test the connection to Printify API and retrieve available shops.
              </p>
              <Button 
                onClick={testConnection} 
                disabled={loading}
                className="mb-4"
              >
                {loading ? 'Testing...' : 'Test Connection'}
              </Button>
              
              {testResults && (
                <div className={`p-4 rounded-lg ${testResults.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <h3 className={`font-semibold ${testResults.success ? 'text-green-800' : 'text-red-800'}`}>
                    {testResults.success ? '✅ Success' : '❌ Failed'}
                  </h3>
                  <p className={testResults.success ? 'text-green-700' : 'text-red-700'}>
                    {testResults.message}
                  </p>
                  {testResults.shops && (
                    <div className="mt-3">
                      <h4 className="font-medium text-green-800">Available Shops:</h4>
                      <pre className="text-sm bg-green-100 p-2 rounded mt-2 overflow-x-auto">
                        {JSON.stringify(testResults.shops, null, 2)}
                      </pre>
                    </div>
                  )}
                  {testResults.error && (
                    <p className="text-red-600 mt-2">Error: {testResults.error}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    Timestamp: {testResults.timestamp}
                  </p>
                </div>
              )}
            </div>

            {/* Products Test */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Products Fetch Test</h2>
              <p className="text-gray-600 mb-4">
                Fetch products from the connected Printify shop.
              </p>
              <Button 
                onClick={fetchProducts} 
                disabled={loading}
                className="mb-4"
              >
                {loading ? 'Fetching...' : 'Fetch Products'}
              </Button>
              
              {productsData && (
                <div className={`p-4 rounded-lg ${productsData.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <h3 className={`font-semibold ${productsData.success ? 'text-green-800' : 'text-red-800'}`}>
                    {productsData.success ? '✅ Success' : '❌ Failed'}
                  </h3>
                  <p className={productsData.success ? 'text-green-700' : 'text-red-700'}>
                    {productsData.message || 'Products fetched successfully'}
                  </p>
                  {productsData.data && (
                    <div className="mt-3">
                      <h4 className="font-medium text-green-800">Products Data:</h4>
                      <pre className="text-sm bg-green-100 p-2 rounded mt-2 overflow-x-auto max-h-64">
                        {JSON.stringify(productsData.data, null, 2)}
                      </pre>
                    </div>
                  )}
                  {productsData.error && (
                    <p className="text-red-600 mt-2">Error: {productsData.error}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    Timestamp: {productsData.timestamp}
                  </p>
                </div>
              )}
            </div>

            {/* Integration Info */}
            <div className="border border-gray-200 rounded-lg p-6 bg-blue-50">
              <h2 className="text-xl font-semibold mb-4 text-blue-800">Integration Status</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-blue-800">Available Endpoints:</h4>
                  <ul className="text-sm text-blue-700 mt-2 space-y-1">
                    <li>• GET /api/printify/test - Connection test</li>
                    <li>• GET /api/printify/products - Fetch products</li>
                    <li>• POST /api/printify/products - Create product</li>
                    <li>• GET /api/printify/shop - Shop information</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-blue-800">Configured Scopes:</h4>
                  <ul className="text-sm text-blue-700 mt-2 space-y-1">
                    <li>• shops.manage, shops.read</li>
                    <li>• products.read, products.write</li>
                    <li>• orders.read, orders.write</li>
                    <li>• catalog.read</li>
                    <li>• uploads.read, uploads.write</li>
                    <li>• webhooks.read, webhooks.write</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}