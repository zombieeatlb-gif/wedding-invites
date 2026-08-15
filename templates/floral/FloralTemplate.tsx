import { WeddingInvitationData } from '@/types/invitation';

export default function FloralTemplate({ data }: { data: WeddingInvitationData }) {
  const details = data.details || {
    invitationText: 'We cordially invite you to celebrate our wedding',
    date: 'Saturday, 25 December 2026',
    time: '11:00 AM - 4:00 PM',
    address: 'Grand Ballroom, Royale Chulan',
    googleMapsUrl: '#',
    wazeUrl: '#'
  };

  return (
    <div className="min-h-full flex flex-col items-center py-16 px-8 text-center" style={{ backgroundColor: data.colors.background || '#fff1f2' }}>
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm mx-auto space-y-10 border-4 p-8 rounded-[3rem]" style={{ borderColor: data.colors.primary }}>
        
        <div className="space-y-2">
          <p className="italic text-sm" style={{ color: data.colors.primary }}>Together with their families</p>
          <h1 className="text-4xl font-serif italic mt-4" style={{ color: data.colors.primary }}>
            {data.couple.bride} <br/> & <br/> {data.couple.groom}
          </h1>
        </div>

        <p className="text-gray-600 leading-relaxed font-serif">
          {details.invitationText}
        </p>

        <div className="space-y-4 w-full">
          <div>
            <h3 className="font-bold text-sm" style={{ color: data.colors.primary }}>{details.date}</h3>
            <p className="text-gray-600 text-sm">{details.time}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm whitespace-pre-line">{details.address}</p>
          </div>
        </div>

        {/* Maps & Waze Buttons */}
        <div className="flex flex-col gap-3 w-full pt-4">
          <a href={details.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 px-4 rounded-full shadow-sm text-white transition-opacity hover:opacity-90" style={{ backgroundColor: data.colors.primary }}>
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            <span className="font-medium text-sm">Open in Google Maps</span>
          </a>
          <a href={details.wazeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 px-4 rounded-full shadow-sm border bg-white transition-opacity hover:opacity-90" style={{ borderColor: data.colors.primary, color: data.colors.primary }}>
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19.1 11.2c-.3 0-.6.1-.8.2-1-1-2.7-1.3-4.1-.7-1.3.5-2.2 1.6-2.2 2.9h-.1c-1.6 0-3 1.1-3.5 2.6-.5.1-1 .3-1.4.6-2 1.4-2.8 4-2.8 4s1.7-.5 3.3-1.5c1.4.8 3.1 1.2 4.8 1.2 4.4 0 8-3.6 8-8 0-.5-.1-1-.2-1.3z"/><circle cx="8" cy="15" r="1.5"/><circle cx="14" cy="15" r="1.5"/></svg>
            <span className="font-medium text-sm">Drive with Waze</span>
          </a>
        </div>

      </div>
    </div>
  );
}