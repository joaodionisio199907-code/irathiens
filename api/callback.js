import { serialize } from "cookie";

export default async function handler(req, res) {
  const code = req.query.code;
  if (!code) return res.status(400).send("No code");

  const params = new URLSearchParams();
  params.append("client_id", process.env.DISCORD_CLIENT_ID);
  params.append("client_secret", process.env.DISCORD_CLIENT_SECRET);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append(
    "redirect_uri",
    "irathiens.vercel.app/api/callback"
  );

  const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  const token = await tokenRes.json();

  if (!token.access_token) {
    console.error(token);
    return res.status(400).json(token);
  }

  const userRes = await fetch("https://discord.com/api/users/@me", {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    },
  });

  const user = await userRes.json();

  res.setHeader(
    "Set-Cookie",
    serialize("user", JSON.stringify(user), {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })
  );

  res.redirect("/main.html");
}





