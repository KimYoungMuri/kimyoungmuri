import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { supabaseAdmin } from "@/lib/supabase-admin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username, password } = req.body ?? {};
  const u = (typeof username === "string" ? username : "").trim();
  const p = typeof password === "string" ? password : "";

  if (!u || u.length < 2) {
    return res.status(400).json({ error: "Username must be at least 2 characters" });
  }
  if (!p || p.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters" });
  }

  const password_hash = await bcrypt.hash(p, 10);

  const { data, error } = await supabaseAdmin
    .from("quantguide_users")
    .insert([{ username: u, password_hash }])
    .select("id, username")
    .single();

  if (error) {
    if (error.code === "23505") {
      return res.status(409).json({ error: "Username already taken" });
    }
    console.error("Register error:", error);
    return res.status(500).json({ error: "Registration failed" });
  }

  return res.status(201).json({ user: { id: data.id, username: data.username } });
}
