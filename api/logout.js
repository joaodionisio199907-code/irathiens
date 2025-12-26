import { serialize } from "cookie";

export default function handler(req, res) {
  res.setHeader(
    "Set-Cookie",
    serialize("user", "", {
      path: "/",
      maxAge: 0,
    })
  );
  res.json({ ok: true });
}
