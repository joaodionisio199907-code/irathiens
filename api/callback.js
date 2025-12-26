import { serialize } from "cookie";
import fetch from "node-fetch";

export default async function handler(req, res) {
  const code = req.query.code;
  if (!code) return res.status(400).send("No code");

  const body = new URLSearchParams({
    client_id: process.env.TWITCH_CLIENT_ID,
    client_secret: process.env.TWITCH_CLIENT_SECRET,
    code,
    grant_type: "authorization_code",
    redirect_uri: "https://TU-DOMINIO.vercel.app/api/callback",
  });

  const tokenRes = await fetch("https://id.twitch.tv/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const token = await tokenRes.json();

  if (!token.access_token) return res.status(400).json(token);

  // Obtener info del usuario
  const userRes = await fetch("https://api.twitch.tv/helix/users", {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
      "Client-Id": process.env.TWITCH_CLIENT_ID,
    },
  });

  const userData = await userRes.json();

  res.setHeader(
    "Set-Cookie",
    serialize("user", JSON.stringify(userData.data[0]), {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })
  );

  res.redirect("/main.html");
}







