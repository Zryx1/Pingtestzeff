const crypto = require('crypto');

module.exports = (req, res) => {
  const requested = parseInt(req.query.size, 10);
  // Batasi 100KB - 20MB supaya tidak membebani function
  const size = Math.min(Math.max(requested || 5_000_000, 100_000), 20_000_000);
  const buffer = crypto.randomBytes(size); // random supaya tidak dikompresi gzip

  res.setHeader('Content-Type', 'application/octet-stream');
  res.setHeader('Content-Length', buffer.length);
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).send(buffer);
};
