export interface WeddingInvitationData {
  templateId: string;
  couple: {
    groom: string;
    bride: string;
  };
  event: {
    date: string;
    time: string;
    venue: string;
    address: string;
    mapsUrl: string;
  };
  text: {
    heroSubtitle: string;
    invitationHeading: string;
    invitationMessage: string;
    closingMessage: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
    headingSize: string;
  };
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
}