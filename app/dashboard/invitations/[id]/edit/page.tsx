'use client';

import { useState, useEffect } from 'react';
import { WeddingInvitationData } from '@/types/invitation';
import { templates, defaultTemplateData } from '@/templates/registry';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EditorPage() {
  const params = useParams();
  const router = useRouter();
  const invitationId = params.id as string;

  const [data, setData] = useState<WeddingInvitationData>(defaultTemplateData);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const ActiveTemplate = templates[data.templateId] || templates['elegant'];

  useEffect(() => {
    async function loadData() {
      if (!invitationId) return;
      const docRef = doc(db, 'invitations', invitationId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // Merge fetched data with default data to ensure new fields aren't blank for old users
        setData({ ...defaultTemplateData, ...(docSnap.data() as WeddingInvitationData) });
      }
      setLoading(false);
    }
    loadData();
  }, [invitationId]);

  const handleChange = (section: keyof WeddingInvitationData, field: string, value: string) => {
    setData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] as any),
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const docRef = doc(db, 'invitations', invitationId);
      await setDoc(docRef, data);
      alert("Success! Your invitation is saved.");
    } catch (error) {
      alert("Failed to save changes. Make sure you are connected to the internet.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="h-screen flex flex-col md:flex-row bg-gray-50 overflow-hidden text-slate-800">
      
      {/* Mobile Tabs */}
      <div className="md:hidden flex bg-white border-b p-2 shadow-sm z-10">
        <button onClick={() => setActiveTab('edit')} className={`flex-1 p-3 font-medium ${activeTab === 'edit' ? 'bg-slate-100 rounded-lg' : 'text-slate-500'}`}>Edit</button>
        <button onClick={() => setActiveTab('preview')} className={`flex-1 p-3 font-medium ${activeTab === 'preview' ? 'bg-slate-100 rounded-lg' : 'text-slate-500'}`}>Preview</button>
      </div>

      {/* Editor Panel */}
      <div className={`w-full md:w-[450px] bg-white border-r flex flex-col ${activeTab === 'preview' ? 'hidden md:flex' : 'flex'}`}>
        
        {/* Back Button */}
        <div className="p-4 border-b bg-white flex items-center">
          <Link href="/dashboard" className="text-slate-500 hover:text-slate-900 font-medium flex items-center gap-2">
            <span>←</span> Back to Dashboard
          </Link>
        </div>

        {/* Settings Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          <div>
            <h2 className="text-xl font-bold mb-4">Names & Colors</h2>
            <div className="space-y-4">
              <input type="text" placeholder="Bride" className="w-full p-2 border rounded" value={data.couple.bride} onChange={(e) => handleChange('couple', 'bride', e.target.value)} />
              <input type="text" placeholder="Groom" className="w-full p-2 border rounded" value={data.couple.groom} onChange={(e) => handleChange('couple', 'groom', e.target.value)} />
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs">Primary</label><input type="color" className="w-full h-10 cursor-pointer" value={data.colors.primary} onChange={(e) => handleChange('colors', 'primary', e.target.value)} /></div>
                <div><label className="text-xs">Background</label><input type="color" className="w-full h-10 cursor-pointer" value={data.colors.background} onChange={(e) => handleChange('colors', 'background', e.target.value)} /></div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Event Details</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Invitation Message</label>
                <textarea className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-slate-400" rows={3} value={data.details.invitationText} onChange={(e) => handleChange('details', 'invitationText', e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Date</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded" value={data.details.date} onChange={(e) => handleChange('details', 'date', e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Time</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded" value={data.details.time} onChange={(e) => handleChange('details', 'time', e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Location / Address</label>
                <textarea className="w-full p-2 border border-gray-300 rounded" rows={2} value={data.details.address} onChange={(e) => handleChange('details', 'address', e.target.value)} />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Navigation Links</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Google Maps URL</label>
                <input type="url" className="w-full p-2 border border-gray-300 rounded" value={data.details.googleMapsUrl} onChange={(e) => handleChange('details', 'googleMapsUrl', e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Waze URL</label>
                <input type="url" className="w-full p-2 border border-gray-300 rounded" value={data.details.wazeUrl} onChange={(e) => handleChange('details', 'wazeUrl', e.target.value)} />
              </div>
            </div>
          </div>

        </div>

        {/* Save Button */}
        <div className="p-4 border-t bg-gray-50">
          <button onClick={handleSave} disabled={isSaving} className="w-full bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 disabled:opacity-50">
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

      </div>

      {/* Live Preview Panel */}
      <div className={`flex-1 bg-gray-200 overflow-y-auto flex items-center justify-center p-4 md:p-8 ${activeTab === 'edit' ? 'hidden md:flex' : 'flex'}`}>
        <div className="w-full max-w-[414px] bg-white h-[800px] max-h-full rounded-[3rem] shadow-2xl overflow-hidden border-8 border-gray-900 relative">
          <div className="w-full h-full overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
            <ActiveTemplate data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}