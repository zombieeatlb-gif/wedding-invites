import { WeddingInvitationData } from '@/types/invitation';

export default function ElegantTemplate({ data }: { data: WeddingInvitationData }) {
  return (
    <div 
      className={`min-h-screen flex flex-col items-center justify-center p-8 text-center ${data.typography.bodyFont}`}
      style={{ backgroundColor: data.colors.background, color: data.colors.text }}
    >
      <div className="max-w-md w-full border border-opacity-20 p-8 rounded-lg shadow-sm" style={{ borderColor: data.colors.primary }}>
        
        {/* Subtitle */}
        <p className="tracking-widest uppercase text-sm mb-4" style={{ color: data.colors.secondary }}>
          {data.text.heroSubtitle}
        </p>
        
        {/* Bride & Groom Names */}
        <h1 className={`${data.typography.headingFont} ${data.typography.headingSize} mb-8`} style={{ color: data.colors.primary }}>
          {data.couple.bride} & {data.couple.groom}
        </h1>

        {/* Invitation Message */}
        <p className="mb-8 text-lg font-light leading-relaxed">
          {data.text.invitationHeading}<br/>
          {data.text.invitationMessage}
        </p>

        {/* Event Details */}
        <div className="py-6 border-t border-b border-opacity-10 my-8" style={{ borderColor: data.colors.primary }}>
          <p className="font-semibold text-xl mb-2">{data.event.date}</p>
          <p className="mb-4">{data.event.time}</p>
          <p className="font-medium">{data.event.venue}</p>
          <p className="text-sm opacity-80">{data.event.address}</p>
        </div>

        {/* Maps Button (Only shows if a URL exists) */}
        {data.event.mapsUrl && (
          <a 
            href={data.event.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block px-6 py-3 rounded-full text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: data.colors.primary }}
          >
            View Location
          </a>
        )}

        {/* Closing */}
        <p className="mt-12 text-sm italic opacity-75">
          {data.text.closingMessage}
        </p>
      </div>
    </div>
  );
}