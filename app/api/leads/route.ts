import { getDb } from "@/db";
import { leads } from "@/db/schema";

const validGoals = new Set(["leaner", "recomp", "muscle"]);
const validSources = new Set(["body-composition-quiz", "peptis-body-composition-quiz", "peptis-glp1-continuity"]);

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as { email?: string; goal?: string; source?: string };
    const email = payload.email?.trim().toLowerCase() ?? "";
    const goal = validGoals.has(payload.goal ?? "") ? payload.goal! : "recomp";
    const source = validSources.has(payload.source ?? "") ? payload.source! : "body-composition-quiz";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: "A valid email is required." }, { status: 400 });
    }

    const db = getDb();
    await db
      .insert(leads)
      .values({ email, goal, source })
      .onConflictDoUpdate({
        target: leads.email,
        set: { goal, source, createdAt: Date.now() },
      });

    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Unable to save Peptis lead", error);
    return Response.json({ error: "Unable to save this plan right now." }, { status: 500 });
  }
}
