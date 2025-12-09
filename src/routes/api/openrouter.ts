import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { getCookieValue } from '@/lib/utils'

export const Route = createFileRoute('/api/openrouter')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const cookieHeader = request.headers.get('cookie')
          const apiKey = getCookieValue(cookieHeader, 'openrouter_key')

          if (!apiKey) {
            return json({ error: 'Missing OpenRouter API key' }, { status: 401 })
          }

          const body = await request.json()

          const upstreamResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${apiKey}`,
              // Optional: Add site URL and name for OpenRouter rankings
              'HTTP-Referer': request.headers.get('origin') || 'http://localhost:3000',
              'X-Title': 'TanStack Start App',
            },
            body: JSON.stringify(body),
          })

          return new Response(upstreamResponse.body, {
            status: upstreamResponse.status,
            headers: {
              'Content-Type': upstreamResponse.headers.get('Content-Type') || 'application/json',
            },
          })
        } catch (error) {
          console.error('OpenRouter Proxy Error:', error)
          return json({ error: 'Internal Server Error' }, { status: 500 })
        }
      },
    },
  },
})
