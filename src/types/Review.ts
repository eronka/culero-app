export type Review = {
  userName?: string;
  profilePictureUrl?: string;
  professionalism: number;
  reliability: number;
  communication: number;
  isAnonymous: boolean;
  isEmailVerified: boolean;
  createdOn: string;
  comment: string;
};
