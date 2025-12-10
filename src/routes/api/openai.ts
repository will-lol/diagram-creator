import { createFileRoute } from '@tanstack/react-router';
import { json } from '@tanstack/react-start';
import { getCookieValue } from '@/lib/utils';

export const Route = createFileRoute('/api/openai')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const cookieHeader = request.headers.get('cookie');
          const apiKey = getCookieValue(cookieHeader, 'openai_key');

          if (!apiKey) {
            return json({ error: 'Missing OpenAI API key' }, { status: 401 });
          }

          const body = await request.json();

          const upstreamResponse = await fetch(
            'https://api.openai.com/v1/chat/completions',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
              },
              body: JSON.stringify(body),
            }
          );

          return new Response(upstreamResponse.body, {
            status: upstreamResponse.status,
            headers: {
              'Content-Type':
                upstreamResponse.headers.get('Content-Type') ||
                'application/json',
            },
          });
        } catch (error) {
          console.error('OpenAI Proxy Error:', error);
          return json({ error: 'Internal Server Error' }, { status: 500 });
        }
      },
    },
  },
});
