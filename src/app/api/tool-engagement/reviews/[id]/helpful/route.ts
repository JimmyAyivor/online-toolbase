// src/app/api/tool-engagement/reviews/[id]/helpful/route.ts
// PATCH /api/tool-engagement/reviews/{id}/helpful
// Atomically increments helpful counter — one vote per IP per review.

import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getIp, hasAlreadyVotedHelpful, recordHelpfulVote } from "@/lib/abuse";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const ip = getIp(req);

  if (!id || typeof id !== "string")
    return NextResponse.json({ error: "id is required" }, { status: 400 });

  // One helpful vote per IP per review
  if (await hasAlreadyVotedHelpful(ip, id))
    return NextResponse.json({ error: "Already voted." }, { status: 403 });

  const rows = await query<{ helpful: number }>(
    `update tool_reviews
     set helpful = helpful + 1
     where id = $1
     returning helpful`,
    [id],
  );

  if (rows.length === 0)
    return NextResponse.json({ error: "Review not found" }, { status: 404 });

  // Record the vote so this IP can't vote again
  await recordHelpfulVote(ip, id);

  return NextResponse.json({ helpful: rows[0].helpful });
}