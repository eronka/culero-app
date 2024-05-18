export type User = {
  email: string;
  isEmailVerified: boolean;
  id: string;

  profilePictureUrl?: string;
  headline?: string;
  name?: string;
};

export type UserWithToken = User & { token: string };

export type Connection = Pick<
  User,
  "profilePictureUrl" | "id" | "isEmailVerified" | "headline" | "name"
> & { addedAt: Date };
