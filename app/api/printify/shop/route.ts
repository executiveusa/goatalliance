import { NextResponse } from 'next/server'
import { printifyAPI } from '@/lib/printify'

export async function GET() {
  try {
    const shop = await printifyAPI.getShop()
    
    return NextResponse.json({
      success: true,
      data: shop,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Printify get shop error:', error)
    
    return NextResponse.json({
      success: false,
      message: 'Failed to get shop information from Printify',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}