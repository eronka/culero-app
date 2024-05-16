/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export interface APP_CONSTANTS {
  ENV: string;
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  InitialScreen: undefined;
  HomeScreen: undefined;
  AuthNav: NavigatorScreenParams<AuthStackParamList>;
  EmailVerificationSuccess: undefined;
  Onboarding: NavigatorScreenParams<OnboardingStackParamList>;
};

export type OnboardingStackParamList = {
  SocialAccounts: undefined;
};

export type AuthStackParamList = {
  Signup: undefined;
  VerifyEmail: { email: string };
  Login: undefined;
  VerifyLogin: { email: string };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {};

export * from "./User";
