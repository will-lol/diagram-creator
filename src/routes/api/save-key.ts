import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

export const Route = createFileRoute('/api/save-key')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json()
          const { token, provider } = body

          if (!token || !provider) {
            return json({ error: 'Missing token or provider' }, { status: 400 })
          }

          let cookieName = ''
          if (provider === 'openai') {
            cookieName = 'openai_key'
          } else if (provider === 'openrouter') {
            cookieName = 'openrouter_key'
          } else {
            return json({ error: 'Invalid provider' }, { status: 400 })
          }

          // Secure; HttpOnly; SameSite=Strict
          const cookieValue = `${cookieName}=${token}; Path=/; HttpOnly; SameSite=Strict; Secure; Max-Age=31536000`

          return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              'Set-Cookie': cookieValue,
            },
          })
        } catch (e) {
          console.error('Error in save-key:', e)
          return json({ error: 'Internal Server Error' }, { status: 500 })
        }
      },
    },
  },
})
