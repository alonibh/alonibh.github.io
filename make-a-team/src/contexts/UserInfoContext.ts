import { createContext } from "react";

export const UserInfoContext = createContext<UserInfo | undefined>(undefined);

export interface UserInfo {
  id: string;
  name: string;
}
