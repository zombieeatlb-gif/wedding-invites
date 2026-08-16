export interface WeddingInvitationData {
  templateId: string;
  isPaid: boolean;
  couple: {
    bride: string;
    groom: string;
  };
  details: {
    invitationText: string;
    date: string;
    time: string;
    address: string;
    googleMapsUrl: string;
    wazeUrl: string;
  };
  colors: {
    primary: string;
    background: string;
  };
}