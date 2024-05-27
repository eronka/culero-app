export enum AuthType {
  EXTERNAL,
  EMAIL,
  LINKEDIN,
  APPLE,
  GOOGLE,
  FACEBOOK,
}
export type Connection = {
  name?: string;
  headline?: string;
  profilePictureUrl?: string;
  id: string;
  email: string;
  isEmailVerified: boolean;
  joinedAt: Date;

  reviewsCount: number;
  connectionsCount: number;
  isConnection: boolean;

  authType: AuthType;
};
