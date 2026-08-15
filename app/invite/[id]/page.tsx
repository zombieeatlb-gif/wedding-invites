'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { templates } from '@/templates/registry';
import { WeddingInvitationData } from '@/types/invitation';

export default function PublicInvitePage() {
  const params = useParams();
  const invitationId = params.id as string;

  const [data, setData] = useState<WeddingInvitationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // RSVP States
  const [name, setName] = useState('');
  const [status, setStatus] = useState('attending');
  const [pax, setPax] = useState(1);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadInvitation() {
      try {
        const docRef = doc(db, 'invitations', invitationId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setData(docSnap.data() as WeddingInvitationData);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    loadInvitation();
  }, [invitationId]);

  // Handle the RSVP button click
  const handleRSVP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Save RSVP to a sub-collection inside this specific invitation!
      await addDoc(collection(db, 'invitations', invitationId, 'rsvps'), {
        name,
        status,
        pax: status === 'attending' ? Number(pax) : 0,
        timestamp: new Date().toISOString()
      });
      setRsvpSubmitted(true);
    } catch (err) {
      alert("Failed to submit RSVP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">Loading invitation...</div>;
  if (error || !data) return <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-800"><h1 className="text-2xl font-bold mb-2">Invitation Not Found</h1></div>;

  const ActiveTemplate = templates[data.templateId] || templates['elegant'];

  return (
    <div className="min-h-screen bg-slate-200 flex justify-center pb-12 sm:py-12">
      <div className="w-full max-w-[414px] min-h-screen sm:min-h-0 bg-white sm:rounded-3xl shadow-2xl relative flex flex-col overflow-hidden">
        
        {/* The Actual Invitation Design */}
        <div className="flex-1">
          <ActiveTemplate data={data} />
        </div>

        {/* RSVP Form Section */}
        <div className="bg-white border-t-4 border-slate-100 p-8">
          {rsvpSubmitted ? (
            <div className="text-center py-6">
              <div className="text-green-500 text-5xl mb-4">✓</div>
              <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2">Thank You!</h3>
              <p className="text-slate-500">Your response has been sent to the couple.</p>
            </div>
          ) : (
            <form onSubmit={handleRSVP} className="space-y-5">
              <h3 className="text-2xl font-serif font-bold text-slate-900 text-center mb-6">RSVP</h3>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Your Name</label>
                <input 
                  type="text" 
                  required 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900" 
                  placeholder="e.g. John Doe" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Will you attend?</label>
                <select 
                  value={status} 
                  onChange={(e) => setStatus(e.target.value)} 
                  className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                >
                  <option value="attending">Joyfully Accept</option>
                  <option value="declined">Regretfully Decline</option>
                </select>
              </div>

              {status === 'attending' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Number of Guests</label>
                  <select 
                    value={pax} 
                    onChange={(e) => setPax(Number(e.target.value))} 
                    className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                    ))}
                  </select>
                </div>
              )}

              <button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full bg-slate-900 text-white py-4 rounded-lg font-medium hover:bg-slate-800 transition-colors disabled:opacity-50 mt-4 shadow-md"
              >
                {isSubmitting ? 'Sending...' : 'Send RSVP'}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}