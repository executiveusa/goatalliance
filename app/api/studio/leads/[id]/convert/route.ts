import { NextResponse } from 'next/server'

import { db } from '@/lib/db'
import { canTransition, withTransition, leadSourceToContactSource } from '@/lib/lead-lifecycle'

interface RouteContext {
  params: Promise<{ id: string }>
}

// Convert a qualified lead into a CRM Contact owned by a Business.
// Backend wiring only: creates the contact record and links it on the
// lead. Sends nothing, charges nothing, notifies nobody.
export async function POST(request: Request, { params }: RouteContext) {
  try {
    const leadId = (await params).id
    const body = await request.json().catch(() => ({}))

    if (!body?.businessId) {
      return NextResponse.json(
        { success: false, message: 'businessId is required to convert a lead.' },
        { status: 400 }
      )
    }

    const [lead, business] = await Promise.all([
      db.lead.findUnique({ where: { id: leadId } }),
      db.business.findUnique({ where: { id: body.businessId } })
    ])

    if (!lead) {
      return NextResponse.json({ success: false, message: 'Lead not found' }, { status: 404 })
    }
    if (!business) {
      return NextResponse.json({ success: false, message: 'Business not found' }, { status: 404 })
    }

    const existingMeta =
      lead.metadata && typeof lead.metadata === 'object' && !Array.isArray(lead.metadata)
        ? (lead.metadata as Record<string, unknown>)
        : {}
    if (existingMeta.contactId) {
      return NextResponse.json(
        { success: false, message: 'Lead already converted', contactId: existingMeta.contactId },
        { status: 409 }
      )
    }
    if (!canTransition(lead.status, 'QUALIFIED')) {
      return NextResponse.json(
        { success: false, message: `Lead in status ${lead.status} cannot be converted` },
        { status: 409 }
      )
    }

    const contact = await db.contact.create({
      data: {
        businessId: business.id,
        name: lead.name ?? 'Unknown',
        phone: lead.phone,
        email: lead.email,
        city: lead.city ?? 'Seattle',
        state: lead.state ?? 'WA',
        source: leadSourceToContactSource(lead.source) as never,
        tags: JSON.stringify(['lead-convert', `lead:${lead.id}`]),
        notes: lead.message
      }
    })

    const metadata = withTransition(existingMeta, {
      from: lead.status,
      to: 'QUALIFIED',
      at: new Date().toISOString(),
      note: `converted to contact ${contact.id}`
    })

    const updatedLead = await db.lead.update({
      where: { id: lead.id },
      data: { status: 'QUALIFIED', metadata: { ...metadata, contactId: contact.id } }
    })

    return NextResponse.json({
      success: true,
      data: { lead: updatedLead, contact },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Lead convert error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to convert lead',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
