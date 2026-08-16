import ElegantTemplate from './elegant/ElegantTemplate';
import FloralTemplate from './floral/FloralTemplate';
import IslamicTemplate from './islamic/IslamicTemplate';
import ModernTemplate from './modern/ModernTemplate';
import LuxuryTemplate from './luxury/LuxuryTemplate';

// This links the ID saved in Firebase to the actual React component
export const templates: Record<string, React.FC<{ data: any }>> = {
  elegant: ElegantTemplate,
  floral: FloralTemplate,
  islamic: IslamicTemplate,
  modern: ModernTemplate,
  luxury: LuxuryTemplate,
};

export const defaultTemplateData = {
  templateId: 'elegant',
  isPaid: false,
  couple: {
    bride: 'Aisyah',
    groom: 'Ahmad'
  },
  details: {
    invitationText: 'We cordially invite you to celebrate our wedding',
    date: 'Saturday, 25 December 2026',
    time: '11:00 AM - 4:00 PM',
    address: 'Grand Ballroom, Royale Chulan',
    googleMapsUrl: 'https://maps.google.com',
    wazeUrl: 'https://waze.com'
  },
  colors: {
    primary: '#0f172a',
    background: '#ffffff'
  }
};