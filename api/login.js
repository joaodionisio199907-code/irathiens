export default function handler(req, res) {
  const redirectUri = encodeURIComponent(
    "https://irathiens.vercel.app/api/callback"
  );

  res.redirect(
    `https://id.twitch.tv/oauth2/authorize?response_type=code` +
    `&client_id=${process.env.TWITCH_CLIENT_ID}` +
    `&redirect_uri=${redirectUri}` +
    `&scope=user:read:email`
  );
}

