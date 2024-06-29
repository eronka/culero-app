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
import { Connection } from "./Connection";

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
  Connections: NavigatorScreenParams<ConnectionStackParamList>;
};

export type AuthStackParamList = {
  Auth: undefined;
  VerifyEmail: { email: string };
};

export type DrawerNavigatorParamList = {
  "Home / explore": undefined;
  "My Reviews": undefined;
  "Write a review": undefined;
  Connections: NavigatorScreenParams<ConnectionStackParamList>;
  Notifications: undefined;
  "My profile": undefined;
  Settings: NavigatorScreenParams<SettingsStackParamList>;
};

export type ConnectionStackParamList = {
  SearchConnection: undefined;
  Connection: { userId: User["id"]; user: Connection };
};

export type SettingsStackParamList = {
  Settings: undefined;
  "Account Settings": undefined;
  Privacy: undefined;
  "Given reviews": undefined;
  "Received reviews": undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {};

export * from "./User";
export * from "./Connection";
