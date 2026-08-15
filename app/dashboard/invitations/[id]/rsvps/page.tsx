'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';

export default function RsvpPage() {
  const params = useParams();
  const invitationId = params.id as string;

  const [rsvps, setRsvps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRsvps() {
      try {
        // Look inside the specific 'rsvps' sub-folder for this invitation
        const rsvpRef = collection(db, 'invitations', invitationId, 'rsvps');
        
        // Sort them by the time they were submitted
        const q = query(rsvpRef, orderBy('timestamp', 'desc'));
        const snapshot = await getDocs(q);
        
        const rsvpList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRsvps(rsvpList);
      } catch (error) {
        console.error("Error fetching RSVPs", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchRsvps();
  }, [invitationId]);

  // Calculate the total number of people attending automatically
  const totalAttending = rsvps
    .filter(r => r.status === 'attending')
    .reduce((sum, r) => sum + r.pax, 0);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">Loading your guest list...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-serif font-bold text-slate-900">Guest Responses</h1>
          <Link href="/dashboard" className="text-slate-500 hover:text-slate-900 font-medium transition-colors">
            ← Back to Dashboard
          </Link>
        </div>

        {/* Dashboard Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          
          {/* Total Counter */}
          <div className="p-8 bg-slate-900 text-white flex justify-between items-center">
            <span className="text-lg font-medium text-slate-300">Total Guests Attending</span>
            <span className="text-5xl font-bold">{totalAttending}</span>
          </div>

          {/* Guest List */}
          <div className="p-6">
            {rsvps.length === 0 ? (
              <p className="text-center text-slate-500 py-12">No responses yet. Share your public link to get started!</p>
            ) : (
              <div className="space-y-4">
                {rsvps.map(rsvp => (
                  <div key={rsvp.id} className="flex justify-between items-center p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">{rsvp.name}</h3>
                      <p className="text-sm text-slate-500">
                        Replied on {new Date(rsvp.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold tracking-wide ${rsvp.status === 'attending' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {rsvp.status === 'attending' ? 'ATTENDING' : 'DECLINED'}
                      </span>
                      {rsvp.status === 'attending' && (
                        <p className="text-sm font-bold text-slate-700 mt-2">{rsvp.pax} {rsvp.pax === 1 ? 'Person' : 'People'}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}