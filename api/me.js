export default function handler(req, res) {
  const cookie = req.headers.cookie || "";
  const match = cookie.match(/user=([^;]+)/);
  if (!match) return res.status(401).json(null);

  res.json(JSON.parse(decodeURIComponent(match[1])));
}
