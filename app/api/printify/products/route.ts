import { NextRequest, NextResponse } from 'next/server'
import { printifyAPI } from '@/lib/printify'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const products = await printifyAPI.getProducts(page, limit)
    
    return NextResponse.json({
      success: true,
      data: products,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Printify get products error:', error)
    
    return NextResponse.json({
      success: false,
      message: 'Failed to get products from Printify',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const productData = await request.json()
    
    const result = await printifyAPI.createProduct(productData)
    
    return NextResponse.json({
      success: true,
      data: result,
      message: 'Product created successfully',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Printify create product error:', error)
    
    return NextResponse.json({
      success: false,
      message: 'Failed to create product in Printify',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}