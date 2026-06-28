export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
export async function GET() {
  const sql = neon(process.env.DATABASE_URL!);
  await sql`CREATE TABLE IF NOT EXISTS dancers (id TEXT PRIMARY KEY, name TEXT NOT NULL, phone TEXT NOT NULL, image_url TEXT, skill_score INTEGER NOT NULL DEFAULT 0, private_score INTEGER NOT NULL DEFAULT 0, attitude_score INTEGER NOT NULL DEFAULT 0, created_at TIMESTAMP NOT NULL DEFAULT NOW())`;
  return NextResponse.json({ success: true });
}
