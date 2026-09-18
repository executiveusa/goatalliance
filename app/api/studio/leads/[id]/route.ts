import { NextResponse } from 'next/server'
import type { LeadStatus } from '@prisma/client'

import { db } from '@/lib/db'
import { canTransition, withTransition } from '@/lib/lead-lifecycle'

interface RouteContext {
  params: Promise<{ id: string }>
}

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const body = await request.json()
    const leadId = (await params).id

    // If a status change is requested, enforce the lifecycle.
    if (body.status) {
      const existing = await db.lead.findUnique({ where: { id: leadId } })
      if (!existing) {
        return NextResponse.json(
          { success: false, message: 'Lead not found' },
          { status: 404 }
        )
      }
      if (!canTransition(existing.status, body.status as LeadStatus)) {
        return NextResponse.json(
          {
            success: false,
            message: `Invalid status transition ${existing.status} -> ${body.status}`,
            allowed: undefined
          },
          { status: 409 }
        )
      }
      if (existing.status !== body.status) {
        body.metadata = withTransition(existing.metadata, {
          from: existing.status,
          to: body.status as LeadStatus,
          at: new Date().toISOString(),
          note: body.transitionNote
        })
      }
    }

    const lead = await db.lead.update({
      where: { id: leadId },
      data: {
        status: body.status,
        score: body.score,
        name: body.name,
        email: body.email,
        phone: body.phone,
        serviceType: body.serviceType,
        message: body.message,
        zipCode: body.zipCode,
        city: body.city,
        state: body.state,
        metadata: body.metadata
      }
    })

    return NextResponse.json({
      success: true,
      data: lead,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Lead update error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update lead',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
