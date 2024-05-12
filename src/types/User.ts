export type User = {
  email: string;
  isEmailVerified: boolean;
};

export type UserWithToken = User & { token: string };
