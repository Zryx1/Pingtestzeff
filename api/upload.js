export const config = { runtime: 'edge' };

export default async function handler(request){
  if (request.method !== 'POST'){
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const reader = request.body.getReader();
  let bytes = 0;
  while (true){
    const { done, value } = await reader.read();
    if (done) break;
    bytes += value.length;
  }

  return new Response(JSON.stringify({ bytesReceived: bytes }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });
}
