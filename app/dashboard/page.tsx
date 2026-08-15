'use client';

import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [invitations, setInvitations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        
        // Fetch ONLY this user's invitations from Firebase
        const q = query(
          collection(db, 'invitations'), 
          where('userId', '==', currentUser.uid)
        );
        
        const querySnapshot = await getDocs(q);
        const userInvites = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setInvitations(userInvites);
      } else {
        router.push('/register');
      }
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-slate-500">Loading your dashboard...</div>;
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="font-serif font-bold text-xl text-slate-900">Walimatul</div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-slate-500">{user.email}</span>
            <button onClick={handleLogout} className="text-sm font-medium text-red-600 hover:text-red-700">Log out</button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 mt-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">My Invitations</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <Link href="/templates" className="bg-white rounded-2xl border-2 border-dashed border-slate-300 p-8 flex flex-col items-center justify-center text-slate-500 hover:border-slate-900 hover:text-slate-900 transition-colors min-h-[250px]">
            <span className="text-4xl mb-4">+</span>
            <span className="font-medium">Create New Invitation</span>
          </Link>

          {/* This loops through the real database data to build the cards! */}
          {invitations.map((invite) => (
            <div key={invite.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
              <div className="h-32 bg-slate-100 flex items-center justify-center border-b border-slate-100">
                <span className="text-slate-400 font-serif capitalize">{invite.templateId} Template</span>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  {invite.couple?.bride || 'Bride'} & {invite.couple?.groom || 'Groom'}
                </h3>
                <p className="text-sm text-slate-500 mb-6 font-mono text-xs truncate">ID: {invite.id}</p>
                <div className="mt-auto flex space-x-3">
                  {/* Notice how the unique ID is placed dynamically in the URL */}
                  <Link href={`/dashboard/invitations/${invite.id}/edit`} className="flex-1 bg-slate-900 text-white text-center py-2 rounded-lg text-sm font-medium hover:bg-slate-800">
                    Edit
                  </Link>
                  <Link 
  href={`/dashboard/invitations/${invite.id}/rsvps`} 
  className="flex-1 bg-slate-100 text-slate-700 text-center py-2 rounded-lg text-sm font-medium hover:bg-slate-200"
>
  RSVPs
</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}