export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { dancers } from '@/lib/schema';
import { desc } from 'drizzle-orm';
export async function GET() {
  try { return NextResponse.json(await db.select().from(dancers).orderBy(desc(dancers.createdAt))); }
  catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
}
export async function POST(req: NextRequest) {
  try {
    const { name, phone, imageUrl, skillScore, privateScore, attitudeScore } = await req.json();
    if (!name || !phone) return NextResponse.json({ error: 'Нэр болон утас шаардлагатай' }, { status: 400 });
    const [dancer] = await db.insert(dancers).values({ name, phone, imageUrl: imageUrl || null, skillScore: Number(skillScore)||0, privateScore: Number(privateScore)||0, attitudeScore: Number(attitudeScore)||0 }).returning();
    return NextResponse.json(dancer, { status: 201 });
  } catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
}
