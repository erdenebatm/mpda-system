export const dynamic = "force-dynamic";
import AdminLayout from '@/components/AdminLayout';
import { db } from '@/lib/db';
import { dancers } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import Link from 'next/link';
export default async function DancerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [dancer] = await db.select().from(dancers).where(eq(dancers.id, id));
  if (!dancer) notFound();
  return (
    <AdminLayout>
      <div className="mb-6 flex justify-between items-center">
        <div><h1 className="text-2xl font-bold text-[#1A2744]">{dancer.name}</h1><p className="text-gray-500 text-sm">{dancer.phone}</p></div>
        <Link href="/admin" className="text-sm text-gray-500 hover:underline">← Буцах</Link>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[{l:'Ур чадвар',s:dancer.skillScore,e:'🎯'},{l:'Нууц үзүүлбэр',s:dancer.privateScore,e:'💫'},{l:'Харилцаа хандлага',s:dancer.attitudeScore,e:'🤝'}].map(({l,s,e})=>(
          <div key={l} className="bg-white rounded-xl border p-4"><div className="text-2xl mb-1">{e}</div><div className="text-sm text-gray-500">{l}</div><div className="text-3xl font-bold text-[#1A2744] mt-1">{s}<span className="text-base text-gray-400">/100</span></div><div className="mt-2 h-1.5 bg-gray-100 rounded-full"><div className="h-full bg-[#1A2744] rounded-full" style={{width:`${s}%`}}/></div></div>
        ))}
      </div>
      <div className="flex gap-3">
        <a href={`/profile/${dancer.id}`} target="_blank" className="border border-[#1A2744] text-[#1A2744] px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1A2744] hover:text-white transition">👤 Профайл харах</a>
      </div>
    </AdminLayout>
  );
}
