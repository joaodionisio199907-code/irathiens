export default function handler(req, res) {
  const redirect = encodeURIComponent(
    "https://irathienscorp.vercel.app/"
  );

  res.redirect(
    `https://discord.com/oauth2/authorize` +
    `?client_id=DISCORD_CLIENT_ID` +
    `&response_type=code` +
    `&scope=identify email` +
    `&redirect_uri=${redirect}`
  );
}

