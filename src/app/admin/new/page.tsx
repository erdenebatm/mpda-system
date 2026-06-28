export const dynamic = "force-dynamic";
'use client';
import AdminLayout from '@/components/AdminLayout';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
export default function NewDancerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState('');
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({ name:'', phone:'', skillScore:70, privateScore:70, attitudeScore:70 });
  const handleImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setPreview(URL.createObjectURL(file)); setUploading(true);
    const fd = new FormData(); fd.append('file', file);
    const res = await fetch('/api/upload', { method:'POST', body:fd });
    const data = await res.json(); setUploadedUrl(data.url||''); setUploading(false);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    const res = await fetch('/api/dancers', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({...form, imageUrl:uploadedUrl}) });
    const d = await res.json();
    if (d.id) router.push(`/admin/${d.id}`); else setLoading(false);
  };
  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold text-[#1A2744] mb-8">Шинэ бүжигчин нэмэх</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-xl border p-6">
            <h2 className="font-semibold text-[#1A2744] mb-4">Профайл зураг</h2>
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden" onClick={()=>fileRef.current?.click()}>
                {preview?<img src={preview} className="w-full h-full object-cover"/>:<span className="text-3xl">📷</span>}
              </div>
              <div>
                <button type="button" onClick={()=>fileRef.current?.click()} className="text-sm text-[#1A2744] border border-[#1A2744] px-4 py-2 rounded-lg hover:bg-[#1A2744] hover:text-white transition">{uploading?'Uploading...':'Зураг сонгох'}</button>
                <p className="text-xs text-gray-400 mt-2">JPG, PNG · 5MB</p>
              </div>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImg}/>
            </div>
          </div>
          <div className="bg-white rounded-xl border p-6 space-y-4">
            <h2 className="font-semibold text-[#1A2744]">Үндсэн мэдээлэл</h2>
            <div><label className="block text-sm text-gray-600 mb-1.5">Нэр *</label><input type="text" required value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Бүжигчний нэр" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#1A2744]"/></div>
            <div><label className="block text-sm text-gray-600 mb-1.5">Утасны дугаар *</label><input type="tel" required value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} placeholder="+976 XXXX XXXX" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#1A2744]"/></div>
          </div>
          <div className="bg-white rounded-xl border p-6 space-y-5">
            <h2 className="font-semibold text-[#1A2744]">Үнэлгээ (1–100)</h2>
            {([['skillScore','🎯 Ур чадвар'],['privateScore','💫 Нууц үзүүлбэр'],['attitudeScore','🤝 Харилцаа хандлага']] as const).map(([key,label])=>(
              <div key={key}><div className="flex justify-between mb-2"><label className="text-sm text-gray-700">{label}</label><span className="text-lg font-bold text-[#1A2744]">{form[key]}</span></div><input type="range" min={1} max={100} value={form[key]} onChange={e=>setForm(f=>({...f,[key]:Number(e.target.value)}))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1A2744]"/></div>
            ))}
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={loading||uploading} className="flex-1 bg-[#1A2744] text-white py-3 rounded-xl font-semibold disabled:opacity-50">{loading?'Үүсгэж байна...':'📄 Хадгалах ба Сертификат үүсгэх'}</button>
            <button type="button" onClick={()=>router.back()} className="px-6 py-3 border border-gray-300 rounded-xl text-gray-600">Цуцлах</button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
