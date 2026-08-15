'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { defaultTemplateData } from '@/templates/registry';

const availableTemplates = [
  { id: 'elegant', name: 'Elegant', description: 'Classic serif typography with a clean layout.', color: 'bg-slate-100' },
  { id: 'floral', name: 'Floral', description: 'Soft botanical elements and romantic styling.', color: 'bg-rose-50' },
  { id: 'islamic', name: 'Islamic', description: 'Traditional geometric patterns and elegant Arabic script fonts.', color: 'bg-emerald-50' },
  { id: 'modern', name: 'Modern', description: 'Minimalist, bold, and contemporary design.', color: 'bg-gray-100' },
  { id: 'luxury', name: 'Luxury Gold', description: 'Premium aesthetic with gold accents and dark backgrounds.', color: 'bg-amber-50' },
];

export default function TemplateGallery() {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleCreateInvitation = async (templateId: string) => {
    // 1. Check if user is logged in
    if (!auth.currentUser) {
      alert("Please log in or create an account to start designing!");
      router.push('/register');
      return;
    }

    setLoadingId(templateId);

    try {
      // 2. Create a new document in Firebase
      const newInviteData = {
        ...defaultTemplateData,
        templateId: templateId,
        userId: auth.currentUser.uid, // Bind this invitation to the logged-in user
        createdAt: new Date().toISOString(),
      };

      const docRef = await addDoc(collection(db, 'invitations'), newInviteData);

      // 3. Send the user to their brand new unique editor link!
      router.push(`/dashboard/invitations/${docRef.id}/edit`);
    } catch (error) {
      console.error("Error creating invitation:", error);
      alert("Something went wrong. Please try again.");
      setLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif font-bold text-slate-900 mb-4">Choose Your Design</h1>
          <p className="text-lg text-slate-600">Select a template to start customizing your wedding invitation.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {availableTemplates.map((template) => (
            <div key={template.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className={`h-64 ${template.color} flex items-center justify-center border-b border-slate-100`}>
                <span className="text-slate-400 font-medium">{template.name} Preview</span>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{template.name}</h3>
                <p className="text-slate-600 text-sm mb-6 h-10">{template.description}</p>
                
                {/* Notice this is now a button that triggers the Firebase function instead of a simple link */}
                <button 
                  onClick={() => handleCreateInvitation(template.id)}
                  disabled={loadingId !== null}
                  className="w-full text-center bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors disabled:opacity-50"
                >
                  {loadingId === template.id ? 'Creating...' : 'Select & Customize'}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link href="/" className="text-slate-500 hover:text-slate-900 font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}