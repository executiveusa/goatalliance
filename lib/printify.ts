/**
 * Printify API integration utility
 * Handles communication with Printify API for product management and orders
 */

const PRINTIFY_API_BASE = 'https://api.printify.com/v1'

export class PrintifyAPI {
  private apiToken: string
  private shopId: string

  constructor() {
    this.apiToken = process.env.PRINTIFY_API_TOKEN || ''
    this.shopId = process.env.PRINTIFY_SHOP_ID || ''
    
    if (!this.apiToken) {
      throw new Error('PRINTIFY_API_TOKEN environment variable is required')
    }
    // Shop ID is optional - we can discover it from the API
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${PRINTIFY_API_BASE}${endpoint}`
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.apiToken}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`Printify API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  // Get user information  
  async getUser() {
    return this.makeRequest('/user/info.json')
  }

  // Get all shops for the user
  async getShops() {
    return this.makeRequest('/shops.json')
  }

  // Get shop information
  async getShop() {
    return this.makeRequest(`/shops/${this.shopId}`)
  }

  // Get all products from the shop
  async getProducts(page = 1, limit = 20) {
    return this.makeRequest(`/shops/${this.shopId}/products.json?page=${page}&limit=${limit}`)
  }

  // Get a specific product
  async getProduct(productId: string) {
    return this.makeRequest(`/shops/${this.shopId}/products/${productId}`)
  }

  // Get all orders
  async getOrders(page = 1, limit = 20) {
    return this.makeRequest(`/shops/${this.shopId}/orders?page=${page}&limit=${limit}`)
  }

  // Get a specific order
  async getOrder(orderId: string) {
    return this.makeRequest(`/shops/${this.shopId}/orders/${orderId}`)
  }

  // Create a new product
  async createProduct(productData: Record<string, unknown>) {
    return this.makeRequest(`/shops/${this.shopId}/products`, {
      method: 'POST',
      body: JSON.stringify(productData),
    })
  }

  // Update a product
  async updateProduct(productId: string, productData: Record<string, unknown>) {
    return this.makeRequest(`/shops/${this.shopId}/products/${productId}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    })
  }

  // Delete a product
  async deleteProduct(productId: string) {
    return this.makeRequest(`/shops/${this.shopId}/products/${productId}`, {
      method: 'DELETE',
    })
  }

  // Get print providers
  async getPrintProviders() {
    return this.makeRequest('/catalog/print_providers')
  }

  // Get catalog
  async getCatalog() {
    return this.makeRequest('/catalog/blueprints')
  }

  // Test API connectivity
  async testConnection() {
    try {
      // Try to get shops first - this is the most basic endpoint
      const shops = await this.getShops()
      
      return {
        success: true,
        shops,
        message: 'Successfully connected to Printify API'
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        message: 'Failed to connect to Printify API'
      }
    }
  }
}

// Singleton instance
export const printifyAPI = new PrintifyAPI()