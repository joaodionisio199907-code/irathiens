import fetch from "node-fetch";
import { serialize } from "cookie";

export default async function handler(req, res) {
  const code = req.query.code;

  const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      grant_type: "authorization_code",
      code,
      redirect_uri: "https://TU-PROYECTO.vercel.app/api/callback",
    }),
  });

  const token = await tokenRes.json();

  const userRes = await fetch("https://discord.com/api/users/@me", {
    headers: { Authorization: `Bearer ${token.access_token}` },
  });

  const user = await userRes.json();

  // Guardar sesión simple en cookie
  res.setHeader(
    "Set-Cookie",
    serialize("user", JSON.stringify(user), {
      path: "/",
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
    })
  );

  res.redirect("/main.html");
}
