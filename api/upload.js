module.exports = (req, res) => {
  if (req.method !== 'POST'){
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  let bytes = 0;
  req.on('data', (chunk) => { bytes += chunk.length; });
  req.on('end', () => {
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({ bytesReceived: bytes });
  });
  req.on('error', () => {
    res.status(500).json({ error: 'Upload gagal' });
  });
};
