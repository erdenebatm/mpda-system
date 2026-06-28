import Link from 'next/link';
import { ReactNode } from 'react';
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-64 bg-[#1A2744] text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="text-xl font-bold tracking-wider">MPDA</div>
          <div className="text-xs text-white/50 mt-1">Admin Panel</div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition text-sm">
            👥 Бүжигчид
          </Link>
          <Link href="/admin/new" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition text-sm">
            ➕ Шинэ нэмэх
          </Link>
        </nav>
        <div className="p-4 text-xs text-white/30 border-t border-white/10">Mongolian Pole Dance Association</div>
      </div>
      <div className="flex-1 p-8 overflow-auto">{children}</div>
    </div>
  );
}
