export const dynamic = "force-dynamic";
import AdminLayout from '@/components/AdminLayout';
import Link from 'next/link';
import { db } from '@/lib/db';
import { dancers } from '@/lib/schema';
import { desc } from 'drizzle-orm';
export default async function AdminDashboard() {
  let list: typeof dancers.$inferSelect[] = [];
  try { list = await db.select().from(dancers).orderBy(desc(dancers.createdAt)); } catch {}
  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div><h1 className="text-2xl font-bold text-[#1A2744]">Бүжигчдийн жагсаалт</h1><p className="text-gray-500 text-sm mt-1">{list.length} бүжигчин</p></div>
        <Link href="/admin/new" className="bg-[#1A2744] text-white px-5 py-2.5 rounded-lg text-sm font-medium">+ Шинэ нэмэх</Link>
      </div>
      {list.length === 0 ? (
        <div className="bg-white rounded-xl border p-16 text-center"><div className="text-5xl mb-4">💃</div><p className="text-gray-500">Бүжигчин бүртгэгдээгүй байна</p><Link href="/admin/new" className="mt-4 inline-block text-[#1A2744] underline">Нэмэх</Link></div>
      ) : (
        <div className="bg-white rounded-xl border overflow-hidden">
          <table className="w-full"><thead className="bg-gray-50 border-b"><tr>{['Зураг','Нэр','Утас','Ур чадвар','Нууц','Харилцаа','Огноо',''].map(h=><th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>)}</tr></thead>
          <tbody className="divide-y">{list.map(d=>(
            <tr key={d.id} className="hover:bg-gray-50">
              <td className="px-4 py-3">{d.imageUrl?<img src={d.imageUrl} className="w-10 h-10 rounded-full object-cover"/>:<div className="w-10 h-10 rounded-full bg-[#1A2744]/10 flex items-center justify-center font-bold text-[#1A2744]">{d.name[0]}</div>}</td>
              <td className="px-4 py-3 font-medium">{d.name}</td>
              <td className="px-4 py-3 text-gray-500 text-sm">{d.phone}</td>
              <td className="px-4 py-3"><span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">{d.skillScore}/100</span></td>
              <td className="px-4 py-3"><span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs">{d.privateScore}/100</span></td>
              <td className="px-4 py-3"><span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">{d.attitudeScore}/100</span></td>
              <td className="px-4 py-3 text-gray-400 text-sm">{new Date(d.createdAt).toLocaleDateString('mn-MN')}</td>
              <td className="px-4 py-3"><Link href={`/admin/${d.id}`} className="text-[#1A2744] text-sm font-medium hover:underline">Сертификат →</Link></td>
            </tr>))}</tbody></table>
        </div>
      )}
    </AdminLayout>
  );
}
