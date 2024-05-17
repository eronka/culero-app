export type User = {
  email: string;
  isEmailVerified: boolean;
  id: string;
};

export type UserWithToken = User & { token: string };
