import { WeddingInvitationData } from '@/types/invitation';

export default function ModernTemplate({ data }: { data: WeddingInvitationData }) {
  const details = data.details || {
    invitationText: 'We cordially invite you to celebrate our wedding',
    date: 'Saturday, 25 December 2026',
    time: '11:00 AM - 4:00 PM',
    address: 'Grand Ballroom, Royale Chulan',
    googleMapsUrl: '#',
    wazeUrl: '#'
  };

  return (
    <div className="min-h-full flex flex-col justify-center py-16 px-10 text-left" style={{ backgroundColor: data.colors.background || '#f3f4f6' }}>
      <div className="w-full max-w-sm mx-auto space-y-12">
        
        <div>
          <h1 className="text-6xl font-bold tracking-tighter" style={{ color: data.colors.primary }}>
            {data.couple.bride}
          </h1>
          <h1 className="text-6xl font-bold tracking-tighter text-gray-400">
            &
          </h1>
          <h1 className="text-6xl font-bold tracking-tighter" style={{ color: data.colors.primary }}>
            {data.couple.groom}
          </h1>
        </div>

        <p className="text-lg text-gray-800 font-medium">
          {details.invitationText}
        </p>

        <div className="space-y-8 border-l-4 pl-6 py-2" style={{ borderColor: data.colors.primary }}>
          <div>
            <p className="text-sm uppercase tracking-widest text-gray-500 font-bold mb-1">When</p>
            <p className="font-bold text-gray-900">{details.date}</p>
            <p className="text-gray-600">{details.time}</p>
          </div>
          <div>
            <p className="text-sm uppercase tracking-widest text-gray-500 font-bold mb-1">Where</p>
            <p className="text-gray-900 whitespace-pre-line">{details.address}</p>
          </div>
        </div>

        {/* Maps & Waze Buttons */}
        <div className="flex gap-4 w-full pt-4">
          <a href={details.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-4 px-4 rounded shadow-lg text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: data.colors.primary }}>
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            <span className="font-bold text-xs tracking-wider">MAPS</span>
          </a>
          <a href={details.wazeUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-4 px-4 rounded shadow-lg bg-white text-gray-900 border hover:bg-gray-50 transition-colors">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19.1 11.2c-.3 0-.6.1-.8.2-1-1-2.7-1.3-4.1-.7-1.3.5-2.2 1.6-2.2 2.9h-.1c-1.6 0-3 1.1-3.5 2.6-.5.1-1 .3-1.4.6-2 1.4-2.8 4-2.8 4s1.7-.5 3.3-1.5c1.4.8 3.1 1.2 4.8 1.2 4.4 0 8-3.6 8-8 0-.5-.1-1-.2-1.3z"/><circle cx="8" cy="15" r="1.5"/><circle cx="14" cy="15" r="1.5"/></svg>
            <span className="font-bold text-xs tracking-wider">WAZE</span>
          </a>
        </div>

      </div>
    </div>
  );
}