import { NextResponse } from 'next/server'
import { printifyAPI } from '@/lib/printify'

export async function GET() {
  try {
    const result = await printifyAPI.testConnection()
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message,
        shops: result.shops,
        timestamp: new Date().toISOString()
      })
    } else {
      return NextResponse.json({
        success: false,
        message: result.message,
        error: result.error,
        timestamp: new Date().toISOString()
      }, { status: 400 })
    }
  } catch (error) {
    console.error('Printify test connection error:', error)
    
    return NextResponse.json({
      success: false,
      message: 'Failed to test Printify connection',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}