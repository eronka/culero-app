export enum SocialAccountType {
  GITHUB = "GITHUB",
  LINKEDIN = "LINKEDIN",
  FACEBOOK = "FACEBOOK",
}
export type SocialAccount = {
  id: string;
  platform: SocialAccountType;
  displayName?: string;
  email?: string;
  socialId?: string;
  profileUrl?: string;
};
