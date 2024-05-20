/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { User } from "./User";

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
  HomeScreen: NavigatorScreenParams<DrawerNavigatorParamList>;
  AuthNav: NavigatorScreenParams<AuthStackParamList>;
  EmailVerificationSuccess: undefined;
  Onboarding: undefined;
};

export type AuthStackParamList = {
  Signup: undefined;
  VerifyEmail: { email: string };
  Login: undefined;
  VerifyLogin: { email: string };
};

export type DrawerNavigatorParamList = {
  "Home / explore": undefined;
  "My Reviews": undefined;
  "Write a review": undefined;
  Connections: NavigatorScreenParams<ConnectionStackParamList>;
  Notifications: undefined;
  "My profile": undefined;
  Settings: undefined;
};

export type ConnectionStackParamList = {
  SearchConnection: undefined;
  Connection: { userId: User["id"] };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {};

export * from "./User";
