export const config = { runtime: 'edge' };

export default function handler(request){
  const { searchParams } = new URL(request.url);
  const requested = parseInt(searchParams.get('size'), 10);
  // Batasi 100KB - 20MB supaya tidak membebani function
  const size = Math.min(Math.max(requested || 5_000_000, 100_000), 20_000_000);

  const chunkSize = 65536; // batas maksimum crypto.getRandomValues per panggilan
  let sent = 0;

  const stream = new ReadableStream({
    pull(controller){
      const remaining = size - sent;
      if (remaining <= 0){
        controller.close();
        return;
      }
      const n = Math.min(chunkSize, remaining);
      const chunk = new Uint8Array(n);
      crypto.getRandomValues(chunk); // acak supaya tidak dikompresi otomatis
      controller.enqueue(chunk);
      sent += n;
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Length': String(size),
      'Cache-Control': 'no-store',
    },
  });
}
