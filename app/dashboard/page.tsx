'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { defaultTemplateData } from '@/templates/registry';
import { Plus, Edit2, Trash2, Share2, ExternalLink } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [invitations, setInvitations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  // 1. Check who is logged in first!
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchMyInvitations(user.uid); // Only fetch THEIR cards
      } else {
        // If not logged in, kick them to a login page
        router.push('/login'); 
      }
    });
    return () => unsubscribe();
  }, [router]);

  // 2. Fetch ONLY the logged-in user's invitations
  const fetchMyInvitations = async (uid: string) => {
    setLoading(true);
    try {
      // THIS IS THE SECURITY LOCK: where("userId", "==", uid)
      const q = query(collection(db, 'invitations'), where("userId", "==", uid));
      const querySnapshot = await getDocs(q);
      
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setInvitations(data);
    } catch (error) {
      console.error("Error fetching invitations: ", error);
    } finally {
      setLoading(false);
    }
  };

  // 3. Create a brand new invitation and attach THEIR user ID to it
  const handleCreateNew = async () => {
    if (!userId) return;
    
    try {
      const docRef = await addDoc(collection(db, 'invitations'), {
        ...defaultTemplateData,
        userId: userId, // SECURITY: Tag this card to this specific user
        createdAt: new Date().toISOString(),
      });
      router.push(`/dashboard/invitations/${docRef.id}/edit`);
    } catch (error) {
      alert("Gagal mencipta kad baru. Sila cuba lagi.");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Adakah anda pasti mahu memadam kad jemputan ini?")) {
      try {
        await deleteDoc(doc(db, 'invitations', id));
        setInvitations(invitations.filter(inv => inv.id !== id));
      } catch (error) {
        alert("Gagal memadam kad.");
      }
    }
  };

  const handleShare = (invitationId: string, isPaid: boolean) => {
    if (!isPaid) {
      alert("⚠️ MAAF, KAD BELUM DIAKTIFKAN.\n\nSila buat pembayaran sebanyak RM10 untuk membuka kunci fungsi perkongsian kepada tetamu.");
      return;
    }

    const baseUrl = window.location.origin;
    const publicLink = `${baseUrl}/i/${invitationId}`;
    const message = `Assalamualaikum W.B.T & Salam Sejahtera,\n\nDengan penuh kesyukuran, kami menjemput Dato/Datin/Tuan/Puan/Encik/Cik ke majlis perkahwinan kami.\n\nSila klik pautan di bawah untuk melihat butiran majlis dan mengesahkan kehadiran (RSVP):\n${publicLink}\n\nKehadiran anda amatlah bermakna dan dialu-alukan. Terima kasih!`;

    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans text-slate-800">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard Jemputan</h1>
            <p className="text-slate-500 mt-1">Urus dan pantau kad jemputan digital anda di sini.</p>
          </div>
          <button 
            onClick={handleCreateNew}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-lg font-medium transition-colors shadow-md"
          >
            <Plus size={20} /> Cipta Kad Baru
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
          </div>
        ) : invitations.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ExternalLink className="text-slate-400" size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-700 mb-2">Tiada Kad Jemputan</h3>
            <p className="text-slate-500 mb-6">Anda belum mempunyai sebarang kad jemputan digital lagi.</p>
            <button onClick={handleCreateNew} className="text-blue-600 font-medium hover:underline">
              Cipta kad pertama anda sekarang
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {invitations.map((inv) => (
              <div key={inv.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                <div className="p-5 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
                  <div>
                    <h3 className="font-bold text-lg text-slate-800 line-clamp-1">
                      {inv.couple?.groom || 'Groom'} & {inv.couple?.bride || 'Bride'}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-medium">
                      {inv.templateId} Template
                    </p>
                  </div>
                  {inv.isPaid ? (
                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Aktif
                    </span>
                  ) : (
                    <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Draf Unpaid
                    </span>
                  )}
                </div>
                <div className="p-5 flex-1 flex flex-col justify-end gap-3">
                  <div className="flex gap-2 mb-2">
                    <button 
                      onClick={() => router.push(`/dashboard/invitations/${inv.id}/edit`)}
                      className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                    >
                      <Edit2 size={16} /> Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(inv.id)}
                      className="w-11 flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                      title="Padam"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <button 
                    onClick={() => handleShare(inv.id, inv.isPaid)}
                    className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-bold transition-all ${
                      inv.isPaid 
                        ? 'bg-green-500 hover:bg-green-600 text-white shadow-sm' 
                        : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    <Share2 size={16} />
                    {inv.isPaid ? 'Share ke WhatsApp' : 'Share (Dikunci)'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}