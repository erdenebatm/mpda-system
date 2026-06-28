export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { dancers } from '@/lib/schema';
import { eq } from 'drizzle-orm';
export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [d] = await db.select().from(dancers).where(eq(dancers.id, id));
  if (!d) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(d);
}
export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await db.delete(dancers).where(eq(dancers.id, id));
  return NextResponse.json({ success: true });
}
