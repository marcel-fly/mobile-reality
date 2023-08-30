import type { NavigationProp } from "@react-navigation/native";

export type RootStackParamList = {
  "HomeScreen": undefined;
  "PostsList": undefined;
  "CreatePost": undefined;
  "PostDetails": { id: number };
};
export type StackNavigation = NavigationProp<RootStackParamList>;
export type ScreenNames = keyof RootStackParamList


export type RouteParams = { id: number }
export type Route = { params: RouteParams}
