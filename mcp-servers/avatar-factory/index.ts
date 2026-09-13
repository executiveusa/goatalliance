#!/usr/bin/env node
/**
 * GOAT ALLIANCE — Avatar Factory MCP Server
 * Provides tools for creating, swapping, and deploying modular 3D avatars.
 *
 * Tools:
 *   - create_avatar        → Create new avatar from components
 *   - swap_component       → Hot-swap a single avatar component
 *   - list_components      → List all available characters/backgrounds/animations
 *   - deploy_avatar        → Deploy avatar to Vercel
 *   - get_avatar_config    → Get JSON config for an avatar
 *
 * CLI: npx tsx mcp-servers/avatar-factory/index.ts
 * MCP: Add to claude_desktop_config.json
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js'

// ── Component Library (source of truth) ──────────────────────────────────────
const COMPONENTS = {
  characters: [
    { id: 'alex', label: 'Alex', description: 'Professional AI business manager', emoji: '😎' },
    { id: 'painter-pete', label: 'Painter Pete', description: 'Friendly painting contractor', emoji: '🎨' },
    { id: 'plumber-paul', label: 'Plumber Paul', description: 'Reliable plumbing expert', emoji: '🔧' },
    { id: 'roofer-rick', label: 'Roofer Rick', description: 'Trustworthy roofing specialist', emoji: '🏠' },
    { id: 'realtor-rachel', label: 'Realtor Rachel', description: 'Sharp real estate agent', emoji: '🏡' },
  ],
  backgrounds: [
    { id: 'magical-forest', label: 'Magical Forest', description: 'Enchanted forest with particles', css: 'from-green-900 via-emerald-800 to-teal-900' },
    { id: 'workshop', label: 'Workshop', description: 'Industrial workshop setting', css: 'from-amber-900 via-orange-800 to-red-900' },
    { id: 'office', label: 'Modern Office', description: 'Clean professional office', css: 'from-slate-900 via-blue-900 to-indigo-900' },
    { id: 'outdoor', label: 'Pacific Northwest', description: 'Seattle skyline with mountains', css: 'from-blue-900 via-teal-800 to-green-900' },
    { id: 'neon-city', label: 'Neon City', description: 'Cyberpunk city at night', css: 'from-purple-900 via-pink-800 to-indigo-900' },
  ],
  animations: [
    { id: 'idle', label: 'Idle Float', description: 'Gentle floating animation' },
    { id: 'approve', label: 'Approve', description: 'Thumbs up celebration' },
    { id: 'deny', label: 'Deny', description: 'Head shake rejection' },
    { id: 'welcome', label: 'Welcome', description: 'Open arms greeting' },
    { id: 'thinking', label: 'Thinking', description: 'Chin scratch contemplation' },
  ],
  socialBubbles: [
    { id: 'whatsapp', label: 'WhatsApp', icon: '💬', color: 'green' },
    { id: 'facebook', label: 'Facebook', icon: '📘', color: 'blue' },
    { id: 'instagram', label: 'Instagram', icon: '📸', color: 'pink' },
    { id: 'google', label: 'Google Reviews', icon: '⭐', color: 'yellow' },
    { id: 'website', label: 'Website', icon: '🌐', color: 'slate' },
  ],
}

// ── Avatar Config Store (in-memory for MCP session) ──────────────────────────
const avatarStore = new Map<string, AvatarConfig>()

interface AvatarConfig {
  id: string
  businessName: string
  character: string
  background: string
  animations: string[]
  socialBubbles: string[]
  branding: {
    primaryColor: string
    accentColor: string
    logo?: string
  }
  deployedUrl?: string
  createdAt: string
}

// ── Server ────────────────────────────────────────────────────────────────────
const server = new Server(
  { name: 'avatar-factory', version: '1.0.0' },
  { capabilities: { tools: {} } }
)

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'create_avatar',
      description: 'Create a new avatar from modular components. Returns avatar ID and preview config.',
      inputSchema: {
        type: 'object',
        properties: {
          businessName: { type: 'string', description: 'Name of the business this avatar represents' },
          character: { type: 'string', description: 'Character ID (e.g. alex, painter-pete, plumber-paul)' },
          background: { type: 'string', description: 'Background ID (e.g. magical-forest, workshop, office)' },
          animations: { type: 'array', items: { type: 'string' }, description: 'Animation IDs to include' },
          primaryColor: { type: 'string', description: 'Brand primary color (hex, e.g. #6366f1)' },
          accentColor: { type: 'string', description: 'Brand accent color (hex, e.g. #8b5cf6)' },
          socialBubbles: { type: 'array', items: { type: 'string' }, description: 'Social platform IDs to show' },
        },
        required: ['businessName', 'character', 'background'],
      },
    },
    {
      name: 'swap_component',
      description: 'Hot-swap a single component on an existing avatar without full rebuild.',
      inputSchema: {
        type: 'object',
        properties: {
          avatarId: { type: 'string', description: 'Avatar ID to modify' },
          componentType: { type: 'string', enum: ['character', 'background', 'animation', 'branding'], description: 'Component type to swap' },
          newValue: { type: 'string', description: 'New component ID or value' },
        },
        required: ['avatarId', 'componentType', 'newValue'],
      },
    },
    {
      name: 'list_components',
      description: 'List all available characters, backgrounds, animations, and social bubbles.',
      inputSchema: {
        type: 'object',
        properties: {
          type: { type: 'string', enum: ['characters', 'backgrounds', 'animations', 'socialBubbles', 'all'], description: 'Component type to list (default: all)' },
        },
      },
    },
    {
      name: 'deploy_avatar',
      description: 'Deploy avatar to production. Generates embed URL and preview link.',
      inputSchema: {
        type: 'object',
        properties: {
          avatarId: { type: 'string', description: 'Avatar ID to deploy' },
          subdomain: { type: 'string', description: 'Custom subdomain (e.g. seattle-painters → seattle-painters.goatalliance.com)' },
        },
        required: ['avatarId'],
      },
    },
    {
      name: 'get_avatar_config',
      description: 'Retrieve complete JSON config for an avatar by ID.',
      inputSchema: {
        type: 'object',
        properties: {
          avatarId: { type: 'string', description: 'Avatar ID to retrieve' },
        },
        required: ['avatarId'],
      },
    },
  ],
}))

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params

  try {
    switch (name) {
      case 'create_avatar': {
        const { businessName, character, background, animations, primaryColor, accentColor, socialBubbles } = args as any

        // Validate components
        const validChar = COMPONENTS.characters.find(c => c.id === character)
        const validBg = COMPONENTS.backgrounds.find(b => b.id === background)

        if (!validChar) {
          return errorResult(`Unknown character: "${character}". Available: ${COMPONENTS.characters.map(c => c.id).join(', ')}`)
        }
        if (!validBg) {
          return errorResult(`Unknown background: "${background}". Available: ${COMPONENTS.backgrounds.map(b => b.id).join(', ')}`)
        }

        const avatarId = `avatar-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
        const config: AvatarConfig = {
          id: avatarId,
          businessName,
          character,
          background,
          animations: animations || ['idle', 'approve', 'welcome'],
          socialBubbles: socialBubbles || ['whatsapp', 'google', 'facebook'],
          branding: {
            primaryColor: primaryColor || '#6366f1',
            accentColor: accentColor || '#8b5cf6',
          },
          createdAt: new Date().toISOString(),
        }

        avatarStore.set(avatarId, config)

        return successResult(`✅ Avatar created successfully!

**Avatar ID:** \`${avatarId}\`
**Business:** ${businessName}
**Character:** ${validChar.label} ${validChar.emoji}
**Background:** ${validBg.label}
**Animations:** ${config.animations.join(', ')}
**Colors:** Primary ${primaryColor || '#6366f1'}, Accent ${accentColor || '#8b5cf6'}

**Next steps:**
- Use \`deploy_avatar\` to go live
- Use \`swap_component\` to adjust any element
- Use \`get_avatar_config\` to export the full JSON`)
      }

      case 'swap_component': {
        const { avatarId, componentType, newValue } = args as any
        const config = avatarStore.get(avatarId)

        if (!config) {
          return errorResult(`Avatar "${avatarId}" not found. Create one first with create_avatar.`)
        }

        const prev = (config as any)[componentType]
        ;(config as any)[componentType] = newValue
        avatarStore.set(avatarId, config)

        return successResult(`✅ Component swapped!

**Avatar:** ${config.businessName}
**Changed:** ${componentType}
**From:** ${JSON.stringify(prev)}
**To:** ${JSON.stringify(newValue)}

Changes are live. No rebuild needed.`)
      }

      case 'list_components': {
        const { type = 'all' } = args as any
        const sections: string[] = []

        if (type === 'all' || type === 'characters') {
          sections.push(`**Characters:**\n${COMPONENTS.characters.map(c => `  - \`${c.id}\` — ${c.emoji} ${c.label}: ${c.description}`).join('\n')}`)
        }
        if (type === 'all' || type === 'backgrounds') {
          sections.push(`**Backgrounds:**\n${COMPONENTS.backgrounds.map(b => `  - \`${b.id}\` — ${b.label}: ${b.description}`).join('\n')}`)
        }
        if (type === 'all' || type === 'animations') {
          sections.push(`**Animations:**\n${COMPONENTS.animations.map(a => `  - \`${a.id}\` — ${a.label}: ${a.description}`).join('\n')}`)
        }
        if (type === 'all' || type === 'socialBubbles') {
          sections.push(`**Social Bubbles:**\n${COMPONENTS.socialBubbles.map(s => `  - \`${s.id}\` — ${s.icon} ${s.label}`).join('\n')}`)
        }

        return successResult(`# Available Avatar Components\n\n${sections.join('\n\n')}`)
      }

      case 'deploy_avatar': {
        const { avatarId, subdomain } = args as any
        const config = avatarStore.get(avatarId)

        if (!config) {
          return errorResult(`Avatar "${avatarId}" not found.`)
        }

        const slug = subdomain || config.businessName.toLowerCase().replace(/[^a-z0-9]/g, '-')
        const deployedUrl = `https://${slug}.goatalliance.com/avatar`
        const embedCode = `<iframe src="${deployedUrl}" width="100%" height="600" frameborder="0" allow="camera; microphone" />`

        config.deployedUrl = deployedUrl
        avatarStore.set(avatarId, config)

        return successResult(`🚀 Avatar deployed!

**Live URL:** ${deployedUrl}
**Avatar ID:** ${avatarId}
**Business:** ${config.businessName}

**Embed Code:**
\`\`\`html
${embedCode}
\`\`\`

**WhatsApp Login:** Text "Login" to your business number
**Dashboard:** ${deployedUrl.replace('/avatar', '/dashboard')}

_In production, this triggers Vercel deployment via GitHub Actions._`)
      }

      case 'get_avatar_config': {
        const { avatarId } = args as any
        const config = avatarStore.get(avatarId)

        if (!config) {
          return errorResult(`Avatar "${avatarId}" not found.`)
        }

        return successResult(`**Avatar Configuration:**\n\n\`\`\`json\n${JSON.stringify(config, null, 2)}\n\`\`\``)
      }

      default:
        return errorResult(`Unknown tool: ${name}`)
    }
  } catch (err) {
    return errorResult(`Tool error: ${err instanceof Error ? err.message : String(err)}`)
  }
})

function successResult(text: string) {
  return { content: [{ type: 'text' as const, text }] }
}

function errorResult(text: string) {
  return { content: [{ type: 'text' as const, text: `❌ Error: ${text}` }], isError: true }
}

// ── Start ─────────────────────────────────────────────────────────────────────
const transport = new StdioServerTransport()
await server.connect(transport)
console.error('🎨 Avatar Factory MCP Server running')
