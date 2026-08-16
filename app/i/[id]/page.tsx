'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { templates } from '@/templates/registry';

export default function PublicInvitationPage() {
  const params = useParams();
  const invitationId = params.id as string;
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInvitation() {
      if (!invitationId) return;
      const docRef = doc(db, 'invitations', invitationId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setData(docSnap.data());
      }
      setLoading(false);
    }
    fetchInvitation();
  }, [invitationId]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center font-sans">Loading...</div>;
  }

  // 1. If link doesn't exist at all
  if (!data) {
    return <div className="min-h-screen flex items-center justify-center font-sans text-xl font-bold text-gray-800">Kad Jemputan Tidak Ditemui</div>;
  }

  // 2. THE ANTI-THEFT DEAD LINK: If not paid, outsiders see absolutely nothing!
  if (data.isPaid !== true) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center font-sans bg-slate-50 text-center p-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Belum Diaktifkan</h1>
        <p className="text-slate-500">Kad jemputan ini masih dalam draf dan belum diterbitkan.</p>
      </div>
    );
  }

  // 3. If paid, show the beautiful invitation
  const ActiveTemplate = templates[data.templateId] || templates['elegant'];
  
  return (
    <div className="relative min-h-screen">
      <ActiveTemplate data={data} />
    </div>
  );
}