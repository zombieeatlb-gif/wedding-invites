import { WeddingInvitationData } from '@/types/invitation';

export default function ElegantTemplate({ data }: { data: WeddingInvitationData }) {
  // Use optional chaining in case old data doesn't have the 'details' object yet
  const details = data.details || {
    invitationText: 'We cordially invite you to celebrate our wedding',
    date: 'Saturday, 25 December 2026',
    time: '11:00 AM - 4:00 PM',
    address: 'Grand Ballroom, Royale Chulan',
    googleMapsUrl: '#',
    wazeUrl: '#'
  };

  return (
    <div 
      className="min-h-full flex flex-col items-center py-16 px-8 text-center"
      style={{ backgroundColor: data.colors.background }}
    >
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm mx-auto space-y-12">
        
        {/* Header */}
        <div className="space-y-4">
          <p className="tracking-widest uppercase text-sm" style={{ color: data.colors.primary }}>
            The Wedding Of
          </p>
          <h1 className="text-5xl font-serif" style={{ color: data.colors.primary }}>
            {data.couple.bride} <br/> & <br/> {data.couple.groom}
          </h1>
        </div>

        {/* Dynamic Invitation Text */}
        <div className="w-16 h-px bg-gray-300 my-8"></div>
        <p className="text-lg text-gray-600 leading-relaxed max-w-xs font-serif italic">
          {details.invitationText}
        </p>
        <div className="w-16 h-px bg-gray-300 my-8"></div>

        {/* Dynamic Event Details */}
        <div className="space-y-6 w-full">
          <div>
            <h3 className="font-bold tracking-widest uppercase text-sm mb-2" style={{ color: data.colors.primary }}>When</h3>
            <p className="text-gray-600">{details.date}</p>
            <p className="text-gray-600">{details.time}</p>
          </div>

          <div>
            <h3 className="font-bold tracking-widest uppercase text-sm mb-2" style={{ color: data.colors.primary }}>Where</h3>
            <p className="text-gray-600 whitespace-pre-line">{details.address}</p>
          </div>
        </div>

        {/* Waze and Google Maps Buttons */}
        <div className="flex gap-4 w-full pt-4">
          
          {/* Google Maps Button */}
          <a 
            href={details.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl shadow-md border hover:bg-gray-50 transition-colors"
            style={{ borderColor: data.colors.primary, color: data.colors.primary }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span className="font-medium text-sm">Maps</span>
          </a>

          {/* Waze Button */}
          <a 
            href={details.wazeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl shadow-md border hover:bg-gray-50 transition-colors"
            style={{ borderColor: data.colors.primary, color: data.colors.primary }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M19.1 11.2c-.3 0-.6.1-.8.2-1-1-2.7-1.3-4.1-.7-1.3.5-2.2 1.6-2.2 2.9h-.1c-1.6 0-3 1.1-3.5 2.6-.5.1-1 .3-1.4.6-2 1.4-2.8 4-2.8 4s1.7-.5 3.3-1.5c1.4.8 3.1 1.2 4.8 1.2 4.4 0 8-3.6 8-8 0-.5-.1-1-.2-1.3z"/>
              <circle cx="8" cy="15" r="1.5"/><circle cx="14" cy="15" r="1.5"/>
            </svg>
            <span className="font-medium text-sm">Waze</span>
          </a>

        </div>

      </div>
    </div>
  );
}