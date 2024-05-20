export type User = {
  email: string;
  isEmailVerified: boolean;
  id: string;
  joinedAt?: string;
  profilePictureUrl?: string;
  headline?: string;
  name?: string;
};

export type UserWithToken = User & { token: string };

export type Connection = Pick<
  User,
  "profilePictureUrl" | "id" | "isEmailVerified" | "headline" | "name"
> & { addedAt: Date };

export type UserWithCounts = User & {
  isConnection: boolean;
  connectionsCount: number;
  ratingsCount: number;
  joinedAt: Date;
};
