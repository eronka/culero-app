export enum ReviewState {
  PENDING,
  APPROVED,
  BLOCKED,
}
export type PostedBy = {
  name?: string;

  profilePictureUrl?: string;
  isEmailVerified?: boolean;
  id: string;
};

export type Review = {
  id: string;
  comment: string;
  professionalism: number;
  reliability: number;
  communication: number;

  createdAt: string;

  postedToId: string;

  isOwnReview: boolean;

  isAnonymous: boolean;
  isFavorite: boolean;

  postedBy?: PostedBy;

  state: ReviewState;
};
