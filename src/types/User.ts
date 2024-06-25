export type User = {
  email: string;
  isEmailVerified: boolean;
  id: string;
  joinedAt?: string;
  profilePictureUrl?: string;
  headline?: string;
  name?: string;
  location?: string;
  onboarded?: boolean;
};

export type UserWithToken = User & { token: string };

export type UserWithCounts = User & {
  isConnection: boolean;
  connectionsCount: number;
  ratingsCount: number;
  joinedAt: Date;
};

export type UserSettings = {
  reviewsVisible: boolean;
  anonymous: boolean;
};
