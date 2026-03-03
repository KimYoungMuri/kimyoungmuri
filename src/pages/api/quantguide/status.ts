import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { supabaseAdmin } from "@/lib/supabase-admin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  const userId = (session?.user as { id?: string } | null)?.id;

  if (req.method === "GET") {
    if (!userId) {
      return res.status(200).json({ statuses: {} });
    }
    const { data, error } = await supabaseAdmin
      .from("question_statuses")
      .select("question_id, status")
      .eq("user_id", userId);
    if (error) {
      console.error("quantguide status GET error:", error);
      return res.status(500).json({ error: "Failed to load statuses" });
    }
    const statuses: Record<string, string> = {};
    (data ?? []).forEach((row) => {
      statuses[row.question_id] = row.status;
    });
    return res.status(200).json({ statuses });
  }

  if (req.method === "PATCH" || req.method === "POST") {
    if (!userId) {
      return res.status(401).json({ error: "Not logged in" });
    }
    const body = req.body ?? {};
    const questionId = typeof body.questionId === "string" ? body.questionId : null;
    const status = typeof body.status === "string" ? body.status : null;
    const statuses = body.statuses && typeof body.statuses === "object" ? body.statuses : null;

    const toUpsert: { user_id: string; question_id: string; status: string }[] = [];
    const valid = ["unsolved", "attempted", "solved"];

    if (questionId && status && valid.includes(status)) {
      toUpsert.push({ user_id: userId, question_id: questionId, status });
    }
    if (statuses && typeof statuses === "object") {
      for (const [qid, s] of Object.entries(statuses)) {
        if (typeof qid === "string" && typeof s === "string" && valid.includes(s)) {
          toUpsert.push({ user_id: userId, question_id: qid, status: s });
        }
      }
    }

    if (toUpsert.length === 0) {
      return res.status(400).json({ error: "Provide questionId/status or statuses object" });
    }

    const { error: upsertError } = await supabaseAdmin
      .from("question_statuses")
      .upsert(toUpsert, { onConflict: "user_id,question_id" });

    if (upsertError) {
      console.error("quantguide status upsert error:", upsertError);
      return res.status(500).json({ error: "Failed to save status" });
    }
    return res.status(200).json({ ok: true });
  }

  res.setHeader("Allow", "GET, PATCH, POST");
  return res.status(405).json({ error: "Method not allowed" });
}
