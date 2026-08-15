import dynamic from 'next/dynamic';
import { WeddingInvitationData } from '@/types/invitation';

// This safely loads your template behind the scenes
const ElegantTemplate = dynamic(() => import('./elegant/ElegantTemplate'));

// This is the "menu" of available templates
export const templates: Record<string, React.FC<{ data: WeddingInvitationData }>> = {
  elegant: ElegantTemplate,
};

// This is the default dummy data we will use to test the editor visually
export const defaultTemplateData: WeddingInvitationData = {
  templateId: 'elegant',
  couple: { groom: 'Ahmad', bride: 'Aisyah' },
  event: {
    date: '24 October 2026',
    time: '11:00 AM - 4:00 PM',
    venue: 'Grand Ballroom',
    address: 'Kuala Lumpur, Malaysia',
    mapsUrl: 'https://maps.google.com',
  },
  text: {
    heroSubtitle: 'Walimatul Urus',
    invitationHeading: 'You are invited',
    invitationMessage: 'With joy in our hearts, we invite you to celebrate our wedding.',
    closingMessage: 'Thank you for your love and support.',
  },
  typography: {
    headingFont: 'font-serif',
    bodyFont: 'font-sans',
    headingSize: 'text-5xl',
  },
  colors: {
    primary: '#1e293b', 
    secondary: '#d4af37', 
    background: '#f8fafc', 
    text: '#334155', 
  },
};