'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { templates } from '@/templates/registry';

export default function PreviewPage() {
  const params = useParams();
  const router = useRouter();
  const invitationId = params.id as string;
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function fetchInvitation() {
      const docRef = doc(db, 'invitations', invitationId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setData(docSnap.data());
    }
    fetchInvitation();
  }, [invitationId]);

  if (!data) return <div className="min-h-screen flex items-center justify-center">Loading Preview...</div>;

  const ActiveTemplate = templates[data.templateId] || templates['elegant'];
  const isPaid = data.isPaid === true;

  return (
    <div className="relative min-h-screen bg-slate-900">
      {/* Top Bar for Dashboard */}
      <div className="fixed top-0 w-full bg-white p-4 shadow-md z-[10000] flex justify-between items-center">
        <h1 className="font-bold text-slate-800">Preview Mode</h1>
        <div className="space-x-3">
          <button onClick={() => router.push(`/dashboard/invitations/${invitationId}/edit`)} className="px-4 py-2 bg-slate-200 rounded-md text-sm font-bold">Kembali ke Editor</button>
          {!isPaid && <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-bold">Terbitkan (RM10)</button>}
        </div>
      </div>

      <div className="pt-20">
        <ActiveTemplate data={data} />
      </div>

      {/* THE WATERMARK (Only shows if NOT paid) */}
      {!isPaid && (
        <div className="fixed inset-0 z-[9999] flex flex-col justify-center items-center overflow-hidden pointer-events-none mt-16">
          <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px] pointer-events-auto"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center opacity-30 rotate-[-35deg] scale-150">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="text-black text-6xl font-black uppercase tracking-widest my-8 whitespace-nowrap drop-shadow-md">
                DRAFT PREVIEW - UNPAID
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}